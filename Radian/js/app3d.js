// Enums
var Clips = Object.freeze({Test:0});
// Utils
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var clock = new THREE.Clock();
var renderer, container, stats, loader;
// Scene objects
var camera, scene, parent;
// Helper scenes
var glowScene, glowParent; // Glow emissive postprocessing scene
// Materials
var objMaterials = [];
var zoomBlurShader; // Glow emissive
var opacity; // Black transparent
// Animation
var mixer;
var actions = {};
// Mouse Input
var mouseX = 0;
var mouseY = 0;
var targetX = 0;
var targetY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// DEBUG. GUI
var gui;
function initGUI() {
	gui = new dat.GUI({
	    height : 40 - 1
	});
	gui.add(objMaterials[0], 'opacity').min(0.0).max(1.0).step(0.0001).name("Black Opacity");
	gui.add(zoomBlurShader.uniforms[ 'strength' ], 'value').min(0.0).max(1.75).step(0.005).name("Blur Strength");
}

function init() {
	container = document.createElement( 'div' );
	container.className = "threecontainer";
	// At beginning of the body:
	$('body').prepend(container);
	// SCENE AND CAMERA
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 15;

	var fog = new THREE.FogExp2( 0xcdebfc, 0.0185 );
	scene = new THREE.Scene();
	glowScene = new THREE.Scene();
	scene.fog = fog;
	parent = new THREE.Object3D();
	glowParent = new THREE.Object3D();
	// LIGHTS
	scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );
	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );
	// REFLECTION
	var path = "textures/cube/SwedishCastle/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

	var reflectionCube = new THREE.CubeTextureLoader().load( urls );
	reflectionCube.format = THREE.RGBFormat;

	var obj2Mats = [];

	var phong1 = new THREE.MeshStandardMaterial( {
		color: 0x000000,
		roughness: 0.1,
		metalness: 1,
		envMap: reflectionCube,
		transparent: true,
		opacity: 0.94
	} );
	objMaterials.push(phong1);

	var blinn1 = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		roughness: 0.5,
		metalness: 0.5,
		envMap: reflectionCube,
		fog: true
	} );
	obj2Mats.push(blinn1);

	var blinn2 = new THREE.MeshStandardMaterial( {
		color: 0xff0000,
		roughness: 0,
		metalness: 0,
		emissive: 0xff0000,
		emissiveIntensity: 3
	} );
	obj2Mats.push(blinn2);
	var emissive = new THREE.ShaderMaterial( {
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	} );
	var mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 0.7, 5 ), emissive );
	mesh.position.set(0,0,1.65);
	glowParent.add(mesh);
	glowParent.position.set(5,0,0.5);
	glowScene.add(glowParent);

	objMaterials.push(obj2Mats);
	//console.log(objMaterials);
	loader = new THREE.ObjectLoader();
	loader.load( "obj/bot.json", function( obj ) {
		//console.log(obj.children.length);
		for (var i=0; i<obj.children.length; i++){
			console.log(obj.children[i].name);
			switch (obj.children[i].name){
				case "":
				break;
				default:
				break;
			}
			if (objMaterials[i] != null){
				obj.children[i].material = objMaterials[i];	
			}
		}
		object = obj;
		object.rotation.set(0,-Math.PI/2,0);
		object.rotation.set(-Math.PI/2,0,0);
		parent.add(object);
		parent.position.set(5,0,0.5);
		scene.add(parent);
		mixer = new THREE.AnimationMixer( object );
		console.log("Total animations: "+object.animations.length);
		actions.test = mixer.clipAction(object.animations[0]);
		actions.test.setLoop(THREE.LoopOnce);
		//actions.test.clampWhenFinished = true;
		// TEMP: First time animation trigger (ABOUT Section)
		TriggerAnim(1);
	} );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x000000 );
	renderer.autoClear = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	// STATS
	if ( debug ) {
		stats = new Stats();
		container.appendChild( stats.dom );
	}
	// EVENTS
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

	orthoScene = new THREE.Scene();
	orthoCamera = new THREE.OrthographicCamera( 1 / - 2, 1 / 2, 1 / 2, 1 / - 2, .00001, 1000 );
	orthoQuad = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), zoomBlurShader );
	orthoScene.add( orthoQuad );

	baseTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	glowTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	//blurTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
	blurTexture = new THREE.WebGLRenderTarget( windowHalfX/2, windowHalfY/2, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	zoomBlurShader = new THREE.ShaderMaterial( {

		uniforms: {
			tDiffuse: { type: "t", value: 0, texture: blurTexture },
			resolution: { type: "v2", value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
			strength: { type: "f", value: 0.75 }
		},
		vertexShader: document.getElementById( 'ortho_vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'zoomBlur_fragmentShader' ).textContent,

		depthWrite: false,

	} );

	compositeShader = new THREE.ShaderMaterial( {

		uniforms: {
			tBase: { type: "t", value: 0, texture: baseTexture },
			tGlow: { type: "t", value: 1, texture: blurTexture }
		},
		vertexShader: document.getElementById( 'ortho_vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'composite_fragmentShader' ).textContent,

		depthWrite: false,

	} );	
}

function TriggerAnim (index) {
	console.log("Animation index: "+index);
	switch(index){
		case 1:
			actions.test.reset();
			actions.test.play();
			break;
		default:
			break;
	}
}
/*function OnLoaded() {
	init();
	animate();
}*/
/*
function createScene( geometry, scale, material ) {
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(5,0,0.5);
	mesh.scale.set( scale, scale, scale );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add( mesh );
}*/
//
function onWindowResize( event ) {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
}
function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );
}
//
function animate() {
	requestAnimationFrame( animate );
	if (typeof mixer != "undefined") mixer.update( clock.getDelta() );
	render();
	if ( debug ) stats.update();
}
function render() {
	targetX = mouseX * .001;
	targetY = mouseY * .001;
	if ( parent ) {
		parent.rotation.y += 0.1 * ( targetX - parent.rotation.y );
		parent.rotation.x += 0.1 * ( targetY - parent.rotation.x );
	}
	if ( glowParent ) {
		glowParent.rotation.y += 0.1 * ( targetX - glowParent.rotation.y );
		glowParent.rotation.x += 0.1 * ( targetY - glowParent.rotation.x );
	}
	renderer.render( glowScene, camera, glowTexture, true );
	renderer.render( scene, camera, baseTexture, true );
	orthoQuad.material = zoomBlurShader;
	orthoQuad.material.uniforms[ 'tDiffuse' ].value = glowTexture.texture;
  	renderer.render( orthoScene, orthoCamera, blurTexture, false );

	orthoQuad.material = compositeShader;
	orthoQuad.material.uniforms[ 'tBase' ].value = baseTexture.texture;
	orthoQuad.material.uniforms[ 'tGlow' ].value = blurTexture.texture;
	renderer.render( orthoScene, orthoCamera );
}
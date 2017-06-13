// Enums
var Clips = Object.freeze({Test:0});
// Utils
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var clock = new THREE.Clock();
var renderer, container, stats, loader;
// Scene objects
var camera, scene, parent, glowSocket;
var object, oclObject;
// Helper scenes
var glowScene, glowParent, glowMesh, worldPos; // Glow emissive postprocessing scene
// Materials
var blackMat, whiteMat, redMat; 
var objMaterials = [];
var zoomBlurShader, zoomCenter; // Glow emissive
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
var	SCREEN_WIDTH = window.innerWidth;
var	SCREEN_HEIGHT = window.innerHeight;
// DEBUG. GUI
var gui;

function initGUI() {
	gui = new dat.GUI({
	    height : 40 - 1
	});
	var black = gui.addFolder('Black Sphere');
	black.add(blackMat, 'roughness').min(0.0).max(1.0).step(0.001).name("Roughness");
	black.add(blackMat, 'metalness').min(0.0).max(1.0).step(0.001).name("Metalness");
	black.add(blackMat, 'opacity').min(0.0).max(1.0).step(0.0001).name("Opacity");
	black.add(blackMat, 'envMapIntensity').min(0.0).max(20.0).step(0.001).name("Reflect intensity");
	var white = gui.addFolder('White Sphere');
	white.add(whiteMat, 'roughness').min(0.0).max(1.0).step(0.001).name("Roughness");
	white.add(whiteMat, 'metalness').min(0.0).max(1.0).step(0.001).name("Metalness");
	white.add(whiteMat, 'envMapIntensity').min(0.0).max(15.0).step(0.001).name("Reflect intensity");
	var glow = gui.addFolder('Glow Effect');
	glow.add(compositeShader.uniforms[ 'glowStrength' ], 'value').min(0.0).max(0.9).step(0.005).name("Glow strength");
	glow.add(zoomBlurShader.uniforms[ 'strength' ], 'value').min(0.0).max(1.25).step(0.005).name("Blur strength");
}

function init() {
	container = document.createElement( 'div' );
	container.className = "threecontainer";
	// At beginning of the body:
	$('body').prepend(container);
	// SCENE AND CAMERA
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 12;
	scene = new THREE.Scene();
	glowScene = new THREE.Scene();
	parent = new THREE.Object3D();
	glowParent = new THREE.Object3D();
	glowSocket = new THREE.Object3D();
	worldPos = new THREE.Vector3();
	// LIGHTS
	scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xbababa, 1, 0 );
	//lights[ 1 ] = new THREE.PointLight( 0xbababa, 1, 0 );
	//lights[ 2 ] = new THREE.PointLight( 0xbababa, 1, 0 );
	lights[ 0 ].position.set( 0, 200, 0 );
	//lights[ 1 ].position.set( 100, 200, 100 );
	//lights[ 2 ].position.set( - 100, - 200, - 100 );
	scene.add( lights[ 0 ] );
	//scene.add( lights[ 1 ] );
	//scene.add( lights[ 2 ] );
	// REFLECTION
	var path = "textures/cube/SwedishCastle/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

	var reflectionCube = new THREE.CubeTextureLoader(manager).load( urls );
	reflectionCube.format = THREE.RGBFormat;

	var obj2Mats = [];

	blackMat = new THREE.MeshStandardMaterial( {
		color: 0x000000,
		roughness: 0.1,
		metalness: 1,
		envMap: reflectionCube,
		envMapIntensity: 6.5,
		transparent: true,
		opacity: 0.94
	} );
	objMaterials.push(blackMat);
	whiteMat = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		roughness: 0.5,
		metalness: 0.5,
		envMap: reflectionCube,
		envMapIntensity: 3.6
	} );
	redMat = new THREE.MeshStandardMaterial( {
		color: 0xff0024,
		roughness: 0.1,
		metalness: 0.3,
		transparent: true,
		opacity: 0.8,
		emissive: 0.5
	} );
	obj2Mats.push(whiteMat);

	var emissiveMat = new THREE.ShaderMaterial( {
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	} );
	obj2Mats.push(redMat);
	
	var oclMaterial = new THREE.MeshBasicMaterial( {
		color: 0x010101
	});
	glowMesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 0.7, 5 ), emissiveMat );
	glowScene.add(glowMesh);
	glowSocket.position.set(0,-1.7,0);
	/*
	var glowMesh_DEBUG = new THREE.Mesh( new THREE.IcosahedronGeometry( 0.7, 5 ), material );
	glowMesh_DEBUG.position.set(0,-1.65,0);
	*/

	objMaterials.push(obj2Mats);
	loader = new THREE.ObjectLoader(manager);
	loader.load( "obj/bot.json", function( obj ) {
		oclObject = obj.clone( true );
		//console.log(obj);
		//console.log(oclObject);
		for (var i=0; i<obj.children.length; i++){
			//console.log(obj.children[i].name);
			oclObject.children[i].position = obj.children[i].position;
			oclObject.children[i].quaternion = obj.children[i].quaternion;
			oclObject.children[i].material = oclMaterial;
			switch (obj.children[i].name){
				case "WhiteSphere":
					console.log("Socket added!");
					//obj.children[i].add(glowMesh_DEBUG);
					obj.children[i].add(glowSocket);
					oclObject.children[i].material = [oclMaterial, emissiveMat];
					break;
				default:
					break;
			}	
			if (objMaterials[i] != null){
				obj.children[i].material = objMaterials[i];	
			}
		}
		object = obj;
		parent.add(object);
		parent.position.set(5,0,0);
		object.rotation.set(0,-Math.PI/2,0);
		object.rotation.set(-Math.PI/2,0,0);
		scene.add(parent);

		glowParent.add(oclObject);
		glowParent.position.set(5,0,0);
		oclObject.rotation.set(0,-Math.PI/2,0);
		oclObject.rotation.set(-Math.PI/2,0,0);
		glowScene.add(glowParent);

		mixer = new THREE.AnimationMixer( object );
		console.log("Total animations: "+object.animations.length);
		actions.test = mixer.clipAction(object.animations[0]);
		actions.test.setLoop(THREE.LoopOnce);
		actions.test.timeScale = 1;
		actions.test.clampWhenFinished = true;
		// TEMP: First time animation trigger (ABOUT Section)
		//TriggerAnim(1);
	} );
	renderer = new THREE.WebGLRenderer( { antialias: false } );
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

	baseTexture = new THREE.WebGLRenderTarget( SCREEN_WIDTH*2, SCREEN_HEIGHT*2, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	glowTexture = new THREE.WebGLRenderTarget( SCREEN_WIDTH/2, SCREEN_HEIGHT/2, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	//blurTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
	blurTexture = new THREE.WebGLRenderTarget( SCREEN_WIDTH/2, SCREEN_HEIGHT/2, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat
	} );

	zoomCenter = new THREE.Vector2( SCREEN_WIDTH*0.5, SCREEN_HEIGHT*0.5 );
	zoomBlurShader = new THREE.ShaderMaterial( {
		uniforms: {
			tDiffuse: { type: "t", value: 0, texture: blurTexture },
			resolution: { type: "v2", value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
			strength: { type: "f", value: 0.9 },
			center: { type: "v2", value: zoomCenter }
		},
		vertexShader: document.getElementById( 'ortho_vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'zoomBlur_fragmentShader' ).textContent,
		depthWrite: false,
	} );

	compositeShader = new THREE.ShaderMaterial( {

		uniforms: {
			tBase: { type: "t", value: 0, texture: baseTexture },
			tGlow: { type: "t", value: 1, texture: blurTexture },
			glowStrength: { type: "f", value: 0.8 }
		},
		vertexShader: document.getElementById( 'ortho_vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'composite_fragmentShader' ).textContent,

		depthWrite: false,

	} );

	
	setInterval( function () {
	    requestAnimationFrame( animate );
	}, 1000 / 30 );
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
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	zoomBlurShader.uniforms[ 'resolution' ].value = new THREE.Vector2( SCREEN_WIDTH, SCREEN_HEIGHT );

	baseTexture.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	glowTexture.setSize( SCREEN_WIDTH/2, SCREEN_HEIGHT/2 );
	blurTexture.setSize( SCREEN_WIDTH/2, SCREEN_HEIGHT/2 );

	orthoQuad.scale.set( SCREEN_WIDTH, SCREEN_HEIGHT, 1 );
	orthoCamera.left   = - SCREEN_WIDTH / 2;
	orthoCamera.right  =   SCREEN_WIDTH / 2;
	orthoCamera.top    =   SCREEN_HEIGHT / 2;
	orthoCamera.bottom = - SCREEN_HEIGHT / 2;
	orthoCamera.updateProjectionMatrix();
}
function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );
}
//
function animate() {
	//requestAnimationFrame( animate );
	targetX = mouseX * .001;
	targetY = mouseY * .001;
	if ( parent ) {
		parent.rotation.y += 0.1 * ( targetX - parent.rotation.y );
		parent.rotation.x += 0.1 * ( targetY - parent.rotation.x );
	}
	glowMesh.position.x = glowSocket.getWorldPosition().x;
	glowMesh.position.y = glowSocket.getWorldPosition().y;
	glowMesh.position.z = glowSocket.getWorldPosition().z;
	// Parents rotations
	glowParent.rotation.x = parent.rotation.x;
	glowParent.rotation.y = parent.rotation.y;
	glowParent.rotation.z = parent.rotation.z;
	//console.log(glowSocket.getWorldPosition());
	//console.log(glowMesh.position);
	if ( typeof object != "undefined" ) {
		for (var i=0; i<object.children.length; i++) {
			// Position
			oclObject.children[i].position.x = object.children[i].position.x;
			oclObject.children[i].position.y = object.children[i].position.y;
			oclObject.children[i].position.z = object.children[i].position.z;
			// Scale
			oclObject.children[i].scale.x = object.children[i].scale.x;
			oclObject.children[i].scale.y = object.children[i].scale.y;
			oclObject.children[i].scale.z = object.children[i].scale.z;
			// Rotation
			oclObject.children[i].rotation.x = object.children[i].rotation.x;
			oclObject.children[i].rotation.y = object.children[i].rotation.y;
			oclObject.children[i].rotation.z = object.children[i].rotation.z;
			switch (object.children[i].name){
				case "WhiteSphere":
					glowMesh.scale.x = object.children[i].scale.x;
					glowMesh.scale.y = object.children[i].scale.y;
					glowMesh.scale.z = object.children[i].scale.z;
					break;
				default:
					break;
			}
		}
		//glowMesh.getWorldPosition ( worldPos );
		object.getWorldPosition ( worldPos );
		worldPos.project(camera);
		worldPos.x = (worldPos.x * windowHalfX) + windowHalfX;
		worldPos.y = - (worldPos.y * windowHalfY) + windowHalfY;
		worldPos.z = 0;
		//console.log(worldPos);
		zoomCenter.set(worldPos.x, worldPos.y);
		//console.log(zoomCenter);
	}
	if (typeof mixer != "undefined") mixer.update( clock.getDelta() );
	render();
	if ( debug ) stats.update();
}
function render() {
	//renderer.render( glowScene, camera );
	renderer.render( glowScene, camera, glowTexture, true );
	renderer.render( scene, camera, baseTexture, true );
	orthoQuad.material = zoomBlurShader;
	orthoQuad.material.uniforms[ 'tDiffuse' ].value = glowTexture.texture;
	orthoQuad.material.uniforms[ 'center' ].value = zoomCenter;
 	renderer.render( orthoScene, orthoCamera, blurTexture, false );
	//renderer.render( orthoScene, orthoCamera );
	orthoQuad.material = compositeShader;
	orthoQuad.material.uniforms[ 'tBase' ].value = baseTexture.texture;
	orthoQuad.material.uniforms[ 'tGlow' ].value = blurTexture.texture;
	renderer.render( orthoScene, orthoCamera );
}
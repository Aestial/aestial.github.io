if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var clock = new THREE.Clock();
var container, stats, loader;

var camera, scene, renderer;
var object, children, parent, mixer, animClips = [];
var objMaterials = [];
var opacity;

var mouseX = 0;
var mouseY = 0;
var targetX = 0;
var targetY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var gui;
function initGUI() {
	gui = new dat.GUI({
	    height : 40 - 1
	});
	gui.add(objMaterials[0], 'opacity').min(0.0).max(1.0).step(0.0001).name("Black Opacity");
}

function init() {
	container = document.createElement( 'div' );
	container.className = "threecontainer";
	// At beginning of the body:
	$('body').prepend(container);
	// SCENE AND CAMERA
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 15;

	var fog = new THREE.FogExp2( 0xcdebfc, 0.0175 );
	scene = new THREE.Scene();
	scene.fog = fog;
	parent = new THREE.Object3D();
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
	var emissive = new THREE.MeshStandardMaterial( {
		color: 0xff0024,
		roughness: 0,
		metalness: 0,
		emissive: 0xff0000,
		emissiveIntensity: 3,
		transparent: true,
		opacity: 0.2
	} );
	//objMaterials.push(emissive);
	objMaterials.push(obj2Mats);
	//console.log(objMaterials);
	/*
	loader = new THREE.JSONLoader();
	loader.load( "obj/bot.json", function( geometry ) { createScene( geometry, 1, materials ) } );
	*/
	loader = new THREE.ObjectLoader();
	loader.load( "obj/bot.json", function( obj ) {
		//createScene( geometry, 1, materials );
		//newCreateScene( obj, objMaterials );
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
				//obj.children[i].rotation.set(0,0,0);
				obj.children[i].material = objMaterials[i];	
			}
		}
		object = obj;
		parent.position.set(5,0,0.5);
		object.rotation.set(0,-Math.PI/2,0);
		object.rotation.set(-Math.PI/2,0,0);
		parent.add(object);
		scene.add(parent);
		mixer = new THREE.AnimationMixer( object );
		console.log("Total animations: "+object.animations.length);
		for (var i=0; i<object.animations.length; i++){
			console.log(object.animations[i]);
			var clipAction = mixer.clipAction(object.animations[i]);
			//clipAction.setLoop(THREE.LoopOnce);
			animClips.push(clipAction);
		}
		// TEMP
		TriggerAnim(0);
		//console.log(animClips);
		//console.log(mixer);
		/*
		var clipAction = mixer.clipAction( object.animations[ 0 ] );
		clipAction.loop = THREE.LoopOnce;
		clipAction.play();
		mixer.clipAction( object.animations[ 0 ] ).play();
		*/
	} );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x000000 );
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
}

function TriggerAnim (index) {
	console.log("Animation index: "+index);
	animClips[index].play();
}

/*function OnLoaded() {
	init();
	animate();
}
/*
function newCreateScene( obj, objMaterials ) {
	//object = obj;
	object = new THREE.Object3D();
	children = obj.children;
	console.log(children.length);
	for (var i=0; i<children.length; i++){
		console.log(children[i]);
		children[i].material = objMaterials[i];
		object.children[i] = children[i];
	}
	//object.position.set(5,0,0.5);
	console.log(object);
	//object.castShadow = true;
	//object.receiveShadow = true;
	scene.add(obj);
}
/*
function createScene( geometry, scale, material ) {
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(5,0,0.5);
	mesh.scale.set( scale, scale, scale );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add( mesh );
}
*/
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
	renderer.render( scene, camera );
}
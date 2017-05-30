if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var statsEnabled = true;
var container, stats, loader;
var camera, scene, renderer;
var mesh, materials = [];
var spotLight;
var mouseX = 0;
var mouseY = 0;
var targetX = 0;
var targetY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var lightColors = [0xbbbbbb,0xbbccaa,0xb899cc,0xddaa99,0x666666]

function init() {
	container = document.createElement( 'div' );
	container.className = "threecontainer";
	// At beginning of the body:
	$('body').prepend(container);
	//
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 15;

	var fog = new THREE.FogExp2( 0xcdebfc, 0.0175 );

	scene = new THREE.Scene();
	scene.fog = fog;
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
	/*
	spotLight = new THREE.SpotLight( 0xbbbbbb, 1 );
	spotLight.position.set( -1, 0, 1.5 );
	spotLight.position.multiplyScalar( 20 );
	scene.add( spotLight );
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 1500;
	spotLight.shadow.camera.fov = 40;
	spotLight.shadow.bias = -0.005;
	//
	/*var mapHeight = new THREE.TextureLoader().load( "obj/leeperrysmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg" );
	mapHeight.anisotropy = 4;
	mapHeight.repeat.set( 0.998, 0.998 );
	mapHeight.offset.set( 0.001, 0.001 );
	mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
	mapHeight.format = THREE.RGBFormat;
	*/
	var path = "textures/cube/SwedishCastle/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

	var reflectionCube = new THREE.CubeTextureLoader().load( urls );
	reflectionCube.format = THREE.RGBFormat;

	var phong1 = new THREE.MeshStandardMaterial( {
		color: 0x260818,
		roughness: 0.1,
		metalness: 1,
		envMap: reflectionCube,
		transparent: true,
		opacity: 0.95
		//bumpMap: mapHeight,
		//bumpScale: 2
	} );
	materials.push(phong1);

	var blinn1 = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		roughness: 0.5,
		metalness: 0.5,
		envMap: reflectionCube,
		fog: true
	} );
	materials.push(blinn1);

	var blinn2 = new THREE.MeshStandardMaterial( {
		color: 0xff0000,
		roughness: 0,
		metalness: 0,
		emissive: 0xff0000,
		emissiveIntensity: 3
	} );
	materials.push(blinn2);
	
	loader = new THREE.JSONLoader();
	loader.load( "obj/bot.json", function( geometry ) { createScene( geometry, 1, materials ) } );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0x000000 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	/*
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderReverseSided = false;
	*/
	//
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	//

	if ( statsEnabled ) {
		stats = new Stats();
		container.appendChild( stats.dom );
	}
	// EVENTS
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function ChangeLightColor(index) {
	//console.log("Color index: "+index);
	spotLight.color.setHex ( lightColors[index-1] );
}

/*function OnLoaded() {
	init();
	animate();
}*/

function createScene( geometry, scale, material ) {
	//console.log(materials);
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(5,0,0.5);
	mesh.scale.set( scale, scale, scale );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	//console.log(mesh);
	scene.add( mesh );
}

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
	render();
	if ( statsEnabled ) stats.update();
}

function render() {
	targetX = mouseX * .001;
	targetY = mouseY * .001;
	if ( mesh ) {
		mesh.rotation.y += 0.1 * ( targetX - mesh.rotation.y );
		mesh.rotation.x += 0.1 * ( targetY - mesh.rotation.x );
	}
	renderer.render( scene, camera );
}
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
	scene = new THREE.Scene();
	// LIGHTS
	scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
	spotLight = new THREE.SpotLight( 0xff1830, 1.1 );
	spotLight.position.set( 0.5, 0, 1 );
	spotLight.position.multiplyScalar( 20 );
	scene.add( spotLight );
	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 2048;
	spotLight.shadow.mapSize.height = 2048;
	spotLight.shadow.camera.near = 200;
	spotLight.shadow.camera.far = 1500;
	spotLight.shadow.camera.fov = 40;
	spotLight.shadow.bias = -0.005;
	//
	var mapHeight = new THREE.TextureLoader().load( "obj/leeperrysmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg" );
	mapHeight.anisotropy = 4;
	mapHeight.repeat.set( 0.998, 0.998 );
	mapHeight.offset.set( 0.001, 0.001 );
	mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
	mapHeight.format = THREE.RGBFormat;

	var phong1 = new THREE.MeshStandardMaterial( {
		color: 0x260818,
		roughness: 0.5,
		metalness: 0,
		//bumpMap: mapHeight,
		//bumpScale: 2
	} );
	materials.push(phong1);

	var blinn1 = new THREE.MeshStandardMaterial( {
		color: 0xffffff,
		roughness: .15,
		metalness: 0,
		//bumpMap: mapHeight,
		//bumpScale: 2
	} );
	materials.push(blinn1);

	var blinn2 = new THREE.MeshStandardMaterial( {
		color: 0xff0000,
		roughness: 0,
		metalness: 0,
		//bumpMap: mapHeight,
		//bumpScale: 2
	} );
	materials.push(blinn2);
	
	loader = new THREE.JSONLoader();
	loader.load( "obj/bot.json", function( geometry ) { createScene( geometry, 1, materials ) } );
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( 0x060708 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderReverseSided = false;
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
	console.log("Color index: "+index);
	spotLight.color.setHex ( lightColors[index-1] );
}

/*function OnLoaded() {
	init();
	animate();
}*/

function createScene( geometry, scale, material ) {
	console.log(materials);
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = 3;
	mesh.position.y = 2;
	mesh.scale.set( scale, scale, scale );
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	console.log(mesh);
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
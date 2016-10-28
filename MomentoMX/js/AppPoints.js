var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var mouseX = 0, mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;

var camera, cameraTarget, scene, renderer, clock, controls;
var debugScene;

var spaceParticles, spacePositions, spaceSize, particle;
var boid, boids, path, modelIndex, reachedCount, maskMat, labelMaterial;

// NEW: PointCloud!
var pCloud, pCloudGeo, pCloudMat;
var pCloudCount = 20000;

// NEW: PointMesh!
var pMesh, pMeshGeo, pMeshMat;

var divElem, divObj, mask;
var buttons = [], buttonsObj = []; 

var buttonsPos = [
    { x: 280, y: 350 },
    { x: 250, y: 150 },
    { x: 300, y:-100 },
    { x:-300, y:-100 },
    { x:-250, y: 130 },
    { x:-280, y: 380 }
    //{ x:BotonN_X, y:BotonN_Y }
];

var pathNodes = [
    { x:-700, y: -50, z: 500 },
    { x:-500, y: 100, z: 100 },
    { x: -80, y: 100, z:  80 },
    { x: 250, y: -50, z: -100 }
];

var stats;
var nodeGizmos, sphereGizmos;
var debug = false; 

init();
animate();

function init() {

    cameraTarget = new THREE.Vector3(0, 100, 0);
    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 30000 );
    camera.position.set(0,100,800);
    
    //camera.lookAt(cameraTarget);

    clock = new THREE.Clock();
    clock.start();

    if (debug) {	 
	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	controls.minDistance = 200.0;
	controls.maxDistance = 2500.0;
	controls.enableDamping = true;
	controls.dampingFactor = 0.2;
	/*
	   controls.minPolarAngle = Math.PI/3;
	   controls.maxPolarAngle = Math.PI/2;
	   controls.minAzimuthAngle = -Math.PI/3;
	   controls.maxAzimuthAngle = Math.PI/3;
	 */
	controls.addEventListener('change', function() {
	    onCameraChange();
	});
	//controls.target = cameraTarget;
    }
    
    scene = new THREE.Scene();
    debugScene = new THREE.Scene();

    var aloader = new THREE.TextureLoader();
    var bloader = new THREE.JSONLoader();
    var cloader = new THREE.ObjectLoader();

    spaceSize = { x: 3000, y:2000, z:1500 };
    spaceParticles = [];
    spaceInfo = [];

    modelIndex = 2;
    reachedCount = 0;
    
    path = new Path();
    var radius = 100;
    var goalRadius = 150;
    nodeGizmos = [];
    sphereGizmos = [];

    ////////////
    // PATH //
    ////////////
    
    for ( var i = 0; i < pathNodes.length; i++ ) {
	var vec = pathNodes[i];
	var node = new THREE.Vector3(vec.x, vec.y, vec.z);
	path.addNode (node, ( i == modelIndex ) ? goalRadius : radius);
	
	// Path debug
	if ( debug ) {
	    var pathMat = new THREE.MeshBasicMaterial( {
		color: 0x00ff00,
		vertexColors: THREE.VertexColors,
		wireframe: true
	    } );
	    var radGizmoMat = new THREE.MeshBasicMaterial( {
		color: 0x00ff00,
		vertexColors: THREE.VertexColors,
		wireframe: false,
		transparent: true,
		opacity: 0.25
	    } );
	    var nodeGizmo = nodeGizmos[i] = new THREE.Mesh( new Triangle(), pathMat );
	    var sphereGizmo = sphereGizmos[i] = new THREE.Mesh ( new THREE.SphereGeometry( path.getRadius(i), 16, 16 ), radGizmoMat);
	    nodeGizmo.position.x = sphereGizmo.position.x = node.x;
	    nodeGizmo.position.y = sphereGizmo.position.y = node.y;
	    nodeGizmo.position.z = sphereGizmo.position.z = node.z;
	    var scale = 10;
	    nodeGizmo.scale.set(scale,scale,scale);
	    
	    if ( i == modelIndex ) {
		sphereGizmo.material.color.set(0x00ffff);
	    } else if ( i > modelIndex ) {
		sphereGizmo.material.color.set(0xff0000);
	    }
	    
	    debugScene.add(nodeGizmo);
	    debugScene.add(sphereGizmo);
	}
	
    }
    
    boids = [];
    streamInfo = [];
    var source = { x: -500, y:0, z:200 };
    var sourceAmp = { x: -400, y:80, z:80 }

    aloader.load( 'img/particle-4.png', function ( texture ) {

	// Cloud point particles
	pCloudGeo = new THREE.Geometry();
	for ( var i = 0; i < pCloudCount; i++) {
	    var pVertex = new THREE.Vector3();
	    pVertex.x = (Math.random() - 0.5) * spaceSize.x;
	    pVertex.y = (Math.random() - 0.5) * spaceSize.y;
	    pVertex.z = (Math.random() - 0.5) * spaceSize.z;
	    pCloudGeo.vertices.push(pVertex);
	}
	pCloudMat = new THREE.PointsMaterial({
	    map: texture,
	    size: 5,
	    sizeAttenuation: true,
	    color: 0xffffff,
	    blending: THREE.AdditiveBlending,
	    transparent: true,
	    opacity: 0.5
	});
	pCloud = new THREE.Points(pCloudGeo, pCloudMat);
	scene.add(pCloud);

	// Stream particles
	pMeshGeo = new THREE.Geometry();
	pMeshMat = new THREE.PointsMaterial( {
	    map: texture,
	    size: 7,
	    sizeAttenuation: true,
	    color: 0xffffff,
	    blending: THREE.AdditiveBlending,
	    transparent: true,
	    opacity: 0.7
	} );
	
	// Load object
	cloader.load( "obj/ChairVert.json", function ( object ) {
	    var rot = -Math.PI/4;
	    var scale = 1.5;
	    var correction = -Math.PI/2;
	    var surface = object.getObjectByName("Surface");
	    var outline = object.getObjectByName("Outline");
	    mask = object.getObjectByName("Mask");
	    if ( debug ) {
		console.log(object);
		console.log(surface.geometry);
		console.log(outline.geometry);
		console.log(mask.geometry);
	    }
	    var color = debug ? 0x505050 : 0x000000;
	    maskMat = new THREE.MeshBasicMaterial( {
		color: color,
		transparent: true,
		opacity: 0,
		wireframe: debug
	    } );
	    var mesh = new THREE.Mesh(mask.geometry, maskMat );
	    mesh.scale.set(scale, scale, scale);
	    mesh.rotateX(correction);
	    var q = new THREE.Quaternion();
	    q.setFromAxisAngle( new THREE.Vector3(0,1,0), rot ); // axis must be normalized, angle in radians
	    mesh.quaternion.multiplyQuaternions( q, mesh.quaternion );
	    scene.add(mesh);
	    
	    var meshVertices = surface.geometry.vertices.length + outline.geometry.vertices.length;
	    for ( var i = 0; i < meshVertices; i ++ ) {
		boid = boids[ i ] = new Boid();
		boid.position.x = Math.random() * sourceAmp.x + source.x;
		boid.position.y = Math.random() * sourceAmp.y + source.y;
		boid.position.z = Math.random() * sourceAmp.z + source.z;
		boid.velocity.x = Math.random() * 2 - 1;
		boid.velocity.y = Math.random() * 2 - 1;
		boid.velocity.z = Math.random() * 2 - 1;
		boid.setIndex(i);
		boid.setSource(source.x, source.y, source.z);
		boid.setRandomSource(sourceAmp.x, sourceAmp.y, sourceAmp.z);
		boid.setModelIndex(modelIndex);
		boid.setPath(path);
		
		var pMVertex = new THREE.Vector3();
		pMeshGeo.vertices.push(pMVertex);

		if ( i < surface.geometry.vertices.length ) {
		    boid.setMeshGoal(surface.geometry.vertices[i].applyAxisAngle(new THREE.Vector3(1,0,0), correction).applyAxisAngle(new THREE.Vector3(0,1,0), rot).multiplyScalar(scale));
		} else {
		    var j = i - surface.geometry.vertices.length;
		    boid.setMeshGoal(outline.geometry.vertices[j].applyAxisAngle(new THREE.Vector3(1,0,0), correction).applyAxisAngle(new THREE.Vector3(0,1,0), rot).multiplyScalar(scale));
		}
	    }
	    pMesh = new THREE.Points(pMeshGeo, pMeshMat);
	    //pMesh.renderDepth = 0;
	    scene.add(pMesh);
	    
	    /////////////
	    // BUTTONS //
	    /////////////
	    
	    buttons = document.getElementsByClassName('square');
	    for ( var i = 0; i < buttons.length; i++ ) {
		buttonsObj[i] = new THREE.Object3D();
		buttonsObj[i].position.set(buttonsPos[i].x, buttonsPos[i].y, 0);
		scene.add(buttonsObj[i]);
	    }
	} );
    });

    ////////////
    // LABELS //
    ////////////
    
    bloader.load( "obj/Diseno.json", function ( geometry ) {
	var color = debug ? 0x505050 : 0x000000;
	var scale = 2.5;
	labelMaterial = new THREE.MeshBasicMaterial( {
	    color: 0xffffff,
	    transparent: true,
	    opacity: 0,
	    wireframe: debug
	} );
	var mesh = new THREE.Mesh(geometry, labelMaterial );
	mesh.rotateX ( Math.PI/2 )
	mesh.position.set(150, 0, -250);
	mesh.scale.set(scale, scale, scale);
	scene.add(mesh);
    } );

    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = false;
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    document.getElementById( 'container' ).appendChild(stats.dom);	 

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    var vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );
    for ( var i = 0, il = boids.length; i < il; i++ ) {
	boid = boids[ i ];
	vector.z = boid.position.z;
	//boid.repulse( vector );
	//boid.setGoal(vector);
    }
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

//
function animate() {
    requestAnimationFrame( animate );
    stats.begin();
    if (debug) {
	controls.update();
    } 
    render();
    stats.end();
}

function render() {

    // pCloud, pGeometry, pCount, pMaterial;
    // Space particles movement
    if ( mask != null) {
	pCloud.geometry.verticesNeedUpdate = true;
	for ( var i = 0; i < pCloudCount; i++ ) {
	    var amp = 3;
	    var phase = pCloud.geometry.vertices[i].x/10;
	    var time = clock.getElapsedTime();
	    var freq = 0.5;
	    pCloud.geometry.vertices[i].y += Math.sin(freq*time+phase)*amp;
	}
    }
    
    // Path nodes movement
    var nodes = path.getNodes();
    var originalPos = path.getOriginalPos();
    var offsets = path.getOffset();
    var amplitude = 50;
    for ( var i = 0; i < nodes.length; i++ ) {
	var yPos = originalPos[i].y + Math.sin(clock.getElapsedTime() + offsets[i]) * amplitude -amplitude/2;
	if ( i == modelIndex ) {
	    nodes[i].y = 2 * yPos;
	} else {
	    nodes[i].y = yPos;
	}
	if ( debug ) {
	    nodeGizmos[i].position.y = sphereGizmos[i].position.y = yPos;
	}
    }
    
    // Boid particles movement
    for ( var i = 0, il = boids.length; i < il; i++ ) {
	boid = boids[ i ];
	boid.run( boids );
	if ( !boid.getCounted() && boid.getReached() ) {
	    reachedCount++;
	    boid.setCounted(true);
	    if (debug) console.log(reachedCount);
	}
	pMesh.geometry.verticesNeedUpdate = true;
	pMesh.geometry.vertices[i].x = boids[i].position.x;
	pMesh.geometry.vertices[i].y = boids[i].position.y;
	pMesh.geometry.vertices[i].z = boids[i].position.z;
	/*
	   if ( i == 1 ) {
	   console.log("x:"+pMesh.geometry.vertices[i].x+"y:"+pMesh.geometry.vertices[i].y+"z:"+pMesh.geometry.vertices[i].z);
	   }
	 */
    }
    if ( pMesh != null) {
	var numVertx = pMesh.geometry.vertices.length;
	var opacity = (reachedCount -numVertx/2)/(numVertx/2);
    }
    
    // Mask material opacity
    if ( maskMat != null ) {
	maskMat.opacity = opacity;
    }
    if ( labelMaterial != null ) {
	labelMaterial.opacity = opacity;
    }

    if (!debug) {
	camera.position.x += ( mouseX - camera.position.x ) * .025;
	camera.lookAt( scene.position );
	onCameraChange();
    }
    
    // Render scenes
    renderer.clear();
    renderer.render( scene, camera );
    renderer.clearDepth();
    renderer.render( debugScene, camera );
}

function Reset () {
    // Stream particles
    for ( var i = 0; i < 2550; i ++ ) {
	boid.position.x = Math.random() * sourceAmp.x + source.x;
	boid.position.y = Math.random() * sourceAmp.y + source.y;
	boid.position.z = Math.random() * sourceAmp.z + source.z;
	boid.velocity.x = Math.random() * 2 - 1;
	boid.velocity.y = Math.random() * 2 - 1;
	boid.velocity.z = Math.random() * 2 - 1;
	boid.setSource(source.x, source.y, source.z);
	boid.setRandomSource(sourceAmp.x, sourceAmp.y, sourceAmp.z);
	boid.setModelIndex(modelIndex);
	boid.setPath(path);
    }
}

function onCameraChange()
{
    for ( var i = 0; i < buttons.length; i++ ) {
	var proj = toScreenPosition(buttonsObj[i], camera);
	buttons[i].style.left = proj.x + 'px';
	buttons[i].style.top = proj.y + 'px';
    }
}

function toScreenPosition(obj, camera)
{
    var vector = new THREE.Vector3();
    // TODO: need to update this when resize window
    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;
    
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    
    return { 
	x: vector.x,
	y: vector.y
    };

}

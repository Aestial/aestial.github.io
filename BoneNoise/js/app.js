// Our Javascript will go here. 

// Helper objects
var container, renderer, composer, controls, clock;
// Scene objects
var scene, camera, spot, spotTarget, direct1, direct2;
// Sprite objects
var hitEffectSprites = [];
// Sprites varibles
var numSprites;
// Textures
var hitEffectTextures = [];
// Screen variabes
var width, height, fullscreen = false;
// Postprocessing variables
var grayEffect, grayAmount, sepiaAmount;
// Tween Functions
var tweenHitAnim_F, tweenLightOn_F;
// Tween variables
var hitAnimOpts	= {
    range		: 0.05,
    head		: 1.05,
    tail		: 1.0,
    duration	: 200,
    delay		: 0,
    easing		: TWEEN.Easing.Bounce.InOut
};
var hitsCounter = 0;

// Interaction
var firstHitFlag = true;
var hitModeOn = true;
var opacityRange = 5;
var targetList = [];
var mouse = { x: 0, y: 0 };
var hitPolarAngle = Math.PI/3.5;
var INTERSECTED = null;
var showSocial = false;
// Languages
var LANGUAGES = ["ES","EN","DE","SV"];
var language = 0;
// Objects 
var djembe;
// Sound
var ctx, ambientSound, hitSound, jawSound, mainVolume;
var muted, music, lockCamera = false;

// Calling functions
$(window).load(function() {
    Cookies.set('BnLogoLoaded', 'false');
    $('#loading').delay(1000).hide();
    $('#tet-intro').delay(1000).load("TETLogo_svg.html");
    $('#intro-cont').delay(6000).velocity({backgroundColorAlpha:0.0}, { duration: 2500, begin: function () {
	tweenLightOn_F.start();
    }, complete: function() {
	$('#tet-intro').hide();
    }});

    $('#hud').delay(16000).velocity({opacity:1},{ duration: 2500, begin: function () {
	$('#intro-cont').hide();
    }});

});

if ( Detector.webgl ) {
    init();
    render();	
} else {
    Detector.addGetWebGLMessage();
}



function setupTween() {
    var currentLightAnim = { spotIntens: 0.0, directIntens: 0.0, target:-20.0};
    var currentHitAnim = { x : hitAnimOpts.tail };
    var updateHitAnim = function() {
	djembe.scale.set(currentHitAnim.x, hitAnimOpts.head+hitAnimOpts.tail-currentHitAnim.x, currentHitAnim.x);
    };
    var completeHitAnim = function () {
	// Desapear all sprites
	for ( var i = 0; i < hitEffectSprites.length; i++ ) {
	    if ( hitEffectSprites[i] != null ) {
		hitEffectSprites[i].visible = false;
		scene.remove(hitEffectSprites[i]);
	    }}
	// Make god judge them
	hitEffectSprites = [];
    };

    // Remove previous tweens if needed
    TWEEN.removeAll();
    var targetY = 3.5;
    tweenLightOn_F = new TWEEN.Tween(currentLightAnim)
	.to( { spotIntens: 0.725, directIntens: 0.725, target: targetY }, 3500)
	.delay(2000)
	.easing(TWEEN.Easing.Bounce.InOut)
	.onUpdate(function(){
	    spot.intensity = currentLightAnim.spotIntens;
      	    spotTarget.position.set(0,currentLightAnim.target,currentLightAnim.target-targetY);
      	    direct1.intensity = currentLightAnim.directIntens;
      	    direct2.intensity = currentLightAnim.directIntens;
	})
	.onComplete(function(){
	    $('#bn-intro').load("BNLogo_svg.html");
	    $('#bn-intro').show();
	});

    tweenHitAnim_F = new TWEEN.Tween(currentHitAnim)
	.to( {x: hitAnimOpts.head}, hitAnimOpts.duration)
	.delay(hitAnimOpts.delay)
	.easing(hitAnimOpts.easing)
	.onUpdate(updateHitAnim)
	.onComplete(completeHitAnim);

    var tweenHitAnim_B = new TWEEN.Tween(currentHitAnim)
	.to( {x: hitAnimOpts.tail}, hitAnimOpts.duration)
	.delay(hitAnimOpts.delay)
	.easing(hitAnimOpts.easing)
	.onUpdate(updateHitAnim);

    tweenHitAnim_F.chain(tweenHitAnim_B);
    // Cyclic
    //tweenHitAnim_B.chain(tweenHitAnim_F);
    // Start the first
    //tweenHitAnim_F.start();
}

function findIntersections( mousePosition, over ) {
    // Create a Ray with origin at the mouse position
    // and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mousePosition.x, mousePosition.y, 1 );
    vector.unproject(camera);
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( targetList );
    var canvas = document.getElementsByTagName("body")[0];
    // Mouse over
    if ( over ) {
	if ( intersects.length > 0 && hitModeOn) {
	    canvas.style.cursor = "url(images/HitCursor.png) 32 32, grab";
	    if ( intersects[ 0 ].object != INTERSECTED ) {
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ) 
		    INTERSECTED.material.opacity = 0.0;
		// store reference to closest object as current intersection object
		INTERSECTED = intersects[ 0 ].object;
		// set a new color for closest object
		INTERSECTED.material.opacity = 0.25;
	    }
	}
	else { 
	    canvas.style.cursor = "url(images/RotateCursor.png) 50 35, move";
	    // restore previous intersection object (if it exists) to its original color
	    if ( INTERSECTED ) 
		INTERSECTED.material.opacity = 0.0;
	    // remove previous intersection object reference
	    // by setting current intersection object to "nothing"
	    INTERSECTED = null;
	}
    }
    // Mouse click / Touch start
    else {
	// if there is one (or more) intersections
	if ( intersects.length > 0 && hitModeOn ) {
	    hitsCounter = hitsCounter+1;
	    if ( grayAmount > 0.0 ) { 
		grayAmount = grayAmount - 0.025;
		grayEffect.uniforms[ 'amount' ].value = grayAmount;
	    }
	    console.log("Hit @ " + intersects[0].object.name + "/Hits Counter: " + hitsCounter.toString() );
	    tweenHitAnim_F.start();
	    createHitSprites();
	    if ( intersects[ 0 ].object != INTERSECTED ) {
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ) 
		    INTERSECTED.material.opacity = 0.0;
		// store reference to closest object as current intersection object
		INTERSECTED = intersects[ 0 ].object;
		// set a new color for closest object
		INTERSECTED.material.opacity = 0.5;
	    }
	    if ( intersects[0].object.name == "LowToneCollider") {
		playSound(hitSound, 0.45);
	    }
	    else if ( intersects[0].object.name == "MedToneCollider") {
		playSound(hitSound, 0.85);
	    }
	    else if ( intersects[0].object.name == "HighToneCollider") {
		playSound(hitSound, 1.25);
	    }
	}
	else { 
	    // restore previous intersection object (if it exists) to its original color
	    if ( INTERSECTED ) 
		INTERSECTED.material.opacity = 0.0;
	    // remove previous intersection object reference
	    // by setting current intersection object to "nothing"
	    INTERSECTED = null;
	}
    }
}

function createHitSprites() {
    // Sprites in 3D space
    numSprites = Math.ceil(8*Math.random() + 3);
    for ( var i = 0; i < numSprites; i++ ) {
	var hitEffectMaterial = new THREE.SpriteMaterial( { map: hitEffectTextures[Math.floor(3*Math.random())] } );
	hitEffectMaterial.rotation = -controls.getAzimuthalAngle() + 2*Math.PI/numSprites*i;
	var hitEffectSprite = new THREE.Sprite( hitEffectMaterial );
	hitEffectSprite.position.set(3.5*Math.sin(Math.PI + 2* Math.PI/numSprites*i) ,5.3, 3.5*Math.cos(Math.PI + 2*Math.PI/numSprites*i));
	var hitEffectScale = Math.random();
	hitEffectSprite.scale.set( 0.8*(hitEffectScale-0.5) + 0.6, 0.8*(hitEffectScale-0.5) + 0.6, 1);
	hitEffectSprite.visible = true;
	hitEffectSprites.push(hitEffectSprite);;
	scene.add( hitEffectSprite );
    }
}

function toggleSocial() {
    showSocial = !showSocial;
    if (showSocial) {
	$('.social').each(function(){
	    $(this).addClass("expandUp");
	});
    }
    else {
	$('.social').each(function(){
	    $(this).removeClass("expandUp");
	});
    }
}

function swapLang() {
    var bubble = $("#message-image");
    var jaw = $("#jaw-image");
    if ( language < LANGUAGES.length-1 )
	language++;
    else 
	language = 0;
    bubble.attr('src', 'images/MessageHit_'+LANGUAGES[language]+".png");
    bubble.addClass("bigEntrance");
    jaw.addClass("speaking");
    jaw.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
		// code to execute after animation ends
		jaw.removeClass();
		var pitch = language/(LANGUAGES.length-1)*0.5+0.5;
		playSound(jawSound, pitch);
		//bubble.style.visibility = 'visible';
	    });
}

function muteButton() {
    muted = !muted;
    mainVolume.gain.value = (muted) ? 0.0:1.0;
    $("#mute-image").fadeTo(500, (muted)?0.5:1.0);
}

function musicButton() {
    var icon = $("#playpause-image");
    music = !music;
    if ( firstHitFlag ) {
	ambientSound.source.start(ctx.currentTime);
	music = true;
	firstHitFlag = false;
    }
    ambientSound.volume.gain.value = (music) ? 0.5:0.0;
    //icon.fadeTo(500, (music)?1.0:0.5);
    if ( music ){
	icon.attr('src','images/PauseIcon.png');
	$("#mute-image").addClass("tossing");

    }else {
	icon.attr('src','images/PlayIcon.png');
	$("#mute-image").removeClass("tossing");
    }
}

function lockCamButton() {
    lockCamera = !lockCamera;
    /*
      $("#lockCam_U-image").fadeTo(500, (lockCamera)?0.5:1.0);
      $("#lockCam_Body-image").fadeTo(500, (lockCamera)?0.5:1.0);
    */
    if (lockCamera)
	$("#lockCam_U-image").velocity({translateY:"8px"}, { duration: 500 });
    else
	$("#lockCam_U-image").velocity({translateY:"-8px"}, { duration: 500 });
    
    controls.enabled = !lockCamera;
}

function rockButton() {
    if ( THREEx.FullScreen.available() ) {
	if( THREEx.FullScreen.activated() ){
	    THREEx.FullScreen.cancel();
	}else{
	    THREEx.FullScreen.request();
	}
    }
}


function playSound(sound, pitch) {
    sound.source = ctx.createBufferSource();
    sound.source.buffer = sound.buffer;
    sound.source.playbackRate.value = pitch;
    sound.source.connect(sound.volume);
    sound.source.start(ctx.currentTime);
}

function openInNewTab(url) {
    var tab = window.open(url, '_blank');
    tab.focus();
}

Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
    return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

// Start function, once program starts
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild(container);
    width = window.innerWidth;
    height = window.innerHeight;

    // SCENE
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera( 40, width / height, 0.1, 120 );
    camera.position.set(0,7.5,20);

    // Spot Light
    spot = new THREE.SpotLight( 0xfefefe );
    spotTarget = new THREE.Object3D();
    spotTarget.position.set(0,0,0);
    spot.position.set(-3.5,15,4.5);
    spot.target = spotTarget;
    spot.intensity = 0.0;
    spot.distance = 0;
    spot.angle = Math.PI/8.5;				
    spot.exponent = 0;
    spot.castShadow = true;
    spot.shadowCameraNear = 5;
    spot.shadowCameraFar = 100;
    spot.shadowCameraFov = 40;
    spot.shadowCameraVisible = false;
    spot.shadowDarkness = 0.9;
    scene.add( spotTarget );
    scene.add( spot );

    // Directional Light Left (spot bounce)
    direct1 = new THREE.DirectionalLight( 0xdedede );
    direct1.position.set(-2.5,0,1.55);
    direct1.target.position.set(0,30,0);
    direct1.intensity = 0.0;
    scene.add(direct1);

    // Directional Light Right (spot bounce)
    direct2 = new THREE.DirectionalLight( 0xdedede );
    direct2.position.set(2.5,0,1.55);
    direct2.target.position.set(0,30,0);
    direct2.intensity = 0.0;
    scene.add(direct2);

    // Ambient Light
    var ambient = new THREE.AmbientLight( 0x4c4c4c );
    scene.add( ambient );

    // Texture Loader 
    var drumBodyTexture = new THREE.ImageUtils.loadTexture('textures/TamborDiff.png');
    var drumBodyTexture2 = new THREE.ImageUtils.loadTexture('textures/TamborDiff2.png');
    var drumRopeTexture = new THREE.ImageUtils.loadTexture('textures/RopeDiff.png');
    var floorDiffTexture = new THREE.ImageUtils.loadTexture('textures/woodfloor/diff.png');
    var floorSpecTexture = new THREE.ImageUtils.loadTexture('textures/woodfloor/spec.png');
    var floorNormTexture = new THREE.ImageUtils.loadTexture('textures/woodfloor/norm.png');

    hitEffectTextures.push(new THREE.ImageUtils.loadTexture('textures/HitEffectSprite.png'));
    hitEffectTextures.push(new THREE.ImageUtils.loadTexture('textures/HitEffectSprite2.png'));
    hitEffectTextures.push(new THREE.ImageUtils.loadTexture('textures/HitEffectSprite3.png'));

    // JS Loader: Use Python Utility for transforming obj to js
    var loader = new THREE.JSONLoader();

    // Djembe
    loader.load("models/DjembeJoin.json", function( geometry, materials ) {
	var materialBody = new THREE.MeshLambertMaterial( {
	    map: drumBodyTexture, shading: THREE.SmoothShading
	} );
	var materialRope = new THREE.MeshLambertMaterial( {map: drumRopeTexture, shading: THREE.SmoothShading, color: 0x44280c, transparent: true, opacity: 1.0, shininess: 3} );
	var djembeMaterials = [materialBody, materialRope];
	var material = new THREE.MeshFaceMaterial(djembeMaterials);
	djembe = new THREE.Mesh( geometry, material );
	djembe.name = "Djembe";
	djembe.castShadow = true;
	djembe.receiveShadow = false;
	// Djembe colliders
	var opacityCol = 0.0;
	loader.load("models/DjembeColHigh.json", function( geometry, materials ) {
            var materialHighCol = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: opacityCol });
	    highCol = new THREE.Mesh(geometry, materialHighCol);
	    highCol.name = "HighToneCollider";
	    djembe.add( highCol );
	    targetList.push( highCol );
	});
	loader.load("models/DjembeColMed.json", function( geometry, materials ) {
            var materialMedCol = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: opacityCol });
	    medCol = new THREE.Mesh(geometry, materialMedCol);
	    medCol.name = "MedToneCollider";
	    djembe.add( medCol );
	    targetList.push( medCol );
	});
	loader.load("models/DjembeColLow.json", function( geometry, materials ) {
            var materialLowCol = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: opacityCol });
	    lowCol = new THREE.Mesh(geometry, materialLowCol);
	    lowCol.name = "LowToneCollider";
	    djembe.add( lowCol );
	    targetList.push( lowCol );
	});
	scene.add( djembe );
    });

    // initialize object to perform world/screen calculations
    // when the mouse moves, call the given function
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', touchstart, false );
    window.addEventListener( 'resize', onWindowResize, false );

    // AUDIO Web API
    // Detect if the audio context is supported.
    window.AudioContext = ( window.AudioContext || window.webkitAudioContext || null );
    if (!AudioContext) throw new Error("AudioContext not supported!");
    // Create a new audio context.
    ctx = new AudioContext();
    // Create a AudioGainNode to control the main volume.
    mainVolume = ctx.createGain();
    mainVolume.gain.value = (muted) ? 0.0:1.0;
    // Connect the main volume node to the context destination.
    mainVolume.connect(ctx.destination);
    // Create an object with a sound source and a volume control.
    ambientSound = {};
    ambientSound.source = ctx.createBufferSource();
    ambientSound.volume = ctx.createGain();
    // Connect the sound source to the volume control.		
    ambientSound.source.connect(ambientSound.volume);
    // Hook up the sound volume control to the main volume.
    ambientSound.volume.connect(mainVolume);
    // Make the sound source loop.
    ambientSound.source.loop = true;
    ambientSound.volume.gain.value = (music) ? 0.5:0.0;
    // Load a sound file using an ArrayBuffer XMLHttpRequest.
    var ambientSoundFileName = 'sounds/AfricanRainCaxixiLoop.mp3';
    var request = new XMLHttpRequest();
    request.open("GET", ambientSoundFileName, true);
    request.responseType = "arraybuffer";
    request.onload = function(e) {
	// Create a buffer from the response ArrayBuffer.
	ctx.decodeAudioData(this.response, function onSuccess(buffer) {
	    ambientSound.buffer = buffer;
	    // Make the sound source use the buffer and start playing it.
	    ambientSound.source.buffer = ambientSound.buffer;
	}, function onFailure() {
	    alert("Decoding the audio buffer failed");
	});
    };
    request.send();
    // Hit Sound
    hitSound = {};
    hitSound.source = ctx.createBufferSource();
    hitSound.volume = ctx.createGain();
    hitSound.volume.gain.value = 1.0;
    hitSound.source.connect(hitSound.volume);
    hitSound.volume.connect(mainVolume);
    var hitSoundFileName = 'sounds/GhanaianDrum_Hit1.mp3';
    request = new XMLHttpRequest();
    request.open("GET", hitSoundFileName, true);
    request.responseType = "arraybuffer";
    request.onload = function(e) {
	// Create a buffer from the response ArrayBuffer.
	ctx.decodeAudioData(this.response, function onSuccess(buffer) {
	    hitSound.buffer = buffer;
	}, function onFailure() {
	    alert("Decoding the audio buffer failed");
	});
    };
    request.send();

    // Hit Sound
    jawSound = {};
    jawSound.source = ctx.createBufferSource();
    jawSound.volume = ctx.createGain();
    jawSound.volume.gain.value = 0.75;
    jawSound.source.connect(jawSound.volume);
    jawSound.volume.connect(mainVolume);
    var jawSoundFileName = 'sounds/jaw.mp3';
    request = new XMLHttpRequest();
    request.open("GET", jawSoundFileName, true);
    request.responseType = "arraybuffer";
    request.onload = function(e) {
	// Create a buffer from the response ArrayBuffer.
	ctx.decodeAudioData(this.response, function onSuccess(buffer) {
	    jawSound.buffer = buffer;
	}, function onFailure() {
	    alert("Decoding the audio buffer failed");
	});
    };
    request.send();

    // Floor
    floorDiffTexture.wrapS = floorDiffTexture.wrapT = THREE.RepeatWrapping;
    floorNormTexture.wrapS = floorNormTexture.wrapT = THREE.RepeatWrapping;
    floorSpecTexture.wrapS = floorSpecTexture.wrapT = THREE.RepeatWrapping;
    floorDiffTexture.repeat.set( 6, 6);
    floorNormTexture.repeat.set( 6, 6);
    floorSpecTexture.repeat.set( 6, 6);
    var floorMaterial = new THREE.MeshPhongMaterial( { 
	specularMap: floorSpecTexture, 
	//specular:0x402d0d,
	normalMap:floorNormTexture, normalScale:new THREE.Vector2(0.25,0.25), 
	color:0x453a35, ambient:0x000000, 
	shininess:1.5, shading:THREE.SmoothShading
    } );
    var floorGeometry = new THREE.PlaneBufferGeometry (35, 35, 2, 2);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.castShadow = false;
    floor.receiveShadow = true;
    scene.add(floor);

    renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(width, height);
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    container.appendChild( renderer.domElement );

    // Clock
    clock = new THREE.Clock(true);

    // Controls
    controls = new THREE.OrbitControls(camera);
    controls.target = new THREE.Vector3(0,3.14,0);
    controls.minDistance = 8;
    controls.maxDistance = 25;
    controls.minPolarAngle = Math.PI/5;
    controls.maxPolarAngle = Math.PI/2.25;
    controls.noPan = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.618;
    //controls.minAzimuthAngle = -Math.PI/40; // radians
    //controls.maxAzimuthAngle = Math.PI/40; // radians

    setupTween();

    // Postprocessing
    composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );
    
    grayEffect = new THREE.ShaderPass( THREE.GrayScaleShader );
    grayAmount = 0.9;
    grayEffect.uniforms[ 'amount' ].value = grayAmount;
    composer.addPass( grayEffect );

    var sepiaEffect = new THREE.ShaderPass( THREE.SepiaShader );
    sepiaAmount = 0.25;
    sepiaEffect.uniforms[ 'amount' ].value = sepiaAmount;
    sepiaEffect.renderToScreen = true;
    composer.addPass( sepiaEffect );
    /*
      var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
      effect.uniforms[ 'amount' ].value = 0.0045; 
      effect.renderToScreen = true;
      composer.addPass( effect );
    */
}

function onWindowResize(){ 
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height; 
    camera.updateProjectionMatrix(); 
    renderer.setSize( width, height );
    composer.setSize( width, height );
}

function touchstart( event ) {
    // Prevent mouse events on touch (mouse-emulation handling)
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    event.preventDefault();
    mouse.x = ( event.touches[ event.touches.length-1 ].pageX / width ) * 2 - 1;
    mouse.y = - ( event.touches[ event.touches.length-1 ].pageY/ height ) * 2 + 1;
    // Find intersections
    findIntersections(new THREE.Vector2( mouse.x, mouse.y), false);
}

function onDocumentMouseMove( event ) {				
    // Update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    findIntersections(new THREE.Vector2( mouse.x, mouse.y), true);								
}

function onDocumentMouseDown( event ) {
    // Update the mouse variable
    mouse.x = ( event.clientX / width ) * 2 - 1;
    mouse.y = - ( event.clientY / height ) * 2 + 1;
    // Find intersections
    findIntersections(new THREE.Vector2( mouse.x, mouse.y), false);								
}

function render() {
    requestAnimationFrame (render);
    renderer.clear();
    var canvas = document.getElementsByTagName("body")[0];
    var bubble = $('#message-image');
    var jaw = $('#jaw-image');
    var lockBody = $("#lockCam_Body-image");
    var lockU = $("#lockCam_U-image");

    if ( controls.getPolarAngle() < hitPolarAngle ) {
	// If animation not started
	if ( !hitModeOn ) {
	    // Start animation
	    hitModeOn = true;
	    //controls.autoRotate = false;
	    jaw.addClass("speaking");
	    bubble.addClass("bigEntrance");
	    jaw.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
		    function(e) {
			// code to execute after animation ends
			jaw.removeClass();
			var pitch = language/(LANGUAGES.length-1)*0.5+0.5;
    			playSound(jawSound, pitch);
			//bubble.style.visibility = 'visible';
		    });
	    lockBody.fadeTo(500, 1.0);
	    lockU.fadeTo(500, 1.0);
	}
	// Change rope opacity
	djembe.material.materials[1].opacity = 1;
	
	// Change colliders opacity
	
    }
    else {
	// Change rope opacity
	if ( djembe!= null ) {
	    var radius = controls.getRadius();
	    /*if ( radius < controls.minDistance + opacityRange ){
	      djembe.material.materials[1].opacity = radius.map(controls.minDistance, controls.minDistance + opacityRange, 0.1, 1);
	      }
	      else {
	      djembe.material.materials[1].opacity = 1;
	      }*/
	}
	if ( hitModeOn ) {
	    hitModeOn = false;
	    lockBody.fadeTo(500, 0.0);
	    lockU.fadeTo(500, 0.0);
	    bubble.removeClass();
	    bubble.css("visibility", "hidden");
	    //controls.autoRotate = true;
	}
    }

    TWEEN.update();
    controls.update();
    // we ask "composer", which contains all the effects, to render the scene:	
    composer.render();
    renderer.clearDepth();
    console.log(Cookies.get('BnLogoLoaded'));
}

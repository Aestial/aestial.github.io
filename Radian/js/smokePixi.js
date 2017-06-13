var width = window.innerWidth;
var height = window.innerHeight;
var pixi_renderer, stage;

// smoke shader
var uniforms = {};
uniforms.resolution = { type: 'v2', value: { x: width, y: height}};
uniforms.alpha = { type: '1f', value: 1.0};
uniforms.shift = { type: '1f', value: 1.6};
uniforms.time = {type: '1f',value: 0};
uniforms.speed = {type: 'v2', value: {x: 0.7, y: 0.4}};
var shaderCode, shaderContainer;
var smokeShader;

var count = 0

function pixi_init() {
	//The stage is the root container that will hold everything in our scene
	stage = new PIXI.Container();
	shaderCode = document.getElementById( 'smoke_fragmentShader' ).innerHTML;
	shaderContainer = document.getElementById( 'smoke_cont' );
	//console.log(shaderContainer);
	//Chooses either WebGL if supported or falls back to Canvas rendering
	pixi_renderer = new PIXI.autoDetectRenderer(width, height, {antialias: true, transparent: true, resolution: 1});
	//pixi_renderer = new PIXI.autoDetectRenderer(width, height, shaderContainer, true);
	pixi_renderer.view.className = "pixi";
	//Add the render view object into the page
	shaderContainer.appendChild(pixi_renderer.view);
	smokeShader = new PIXI.AbstractFilter('',shaderCode, uniforms);
	var bg = PIXI.Sprite.fromImage("images/pixi.png");
	bg.width = width;
	bg.height = height;
	bg.filters = [smokeShader];
	stage.addChild(bg);

	 // create a video texture from a path
    var video = PIXI.Texture.fromVideo('videos/BBB_720.mp4');
    video.baseTexture.source.autoplay = false;
    video.baseTexture.source.currentTime = 0;
    video.baseTexture.source.loop = true;
    video.baseTexture.source.muted = true;
    // create a new Sprite using the video texture (yes it's that easy)
    var videoSprite = new PIXI.Sprite(video);
    // Stetch the fullscreen
    videoSprite.width = pixi_renderer.width;
    videoSprite.height = pixi_renderer.height;
    videoSprite.alpha = 0.25;
    //stage.addChild(videoSprite);
    //console.log(videoSprite);
    //Video Mask
    var mask = PIXI.Sprite.fromImage('images/arcade_mask.png');
    mask.width = pixi_renderer.height*0.85;
    mask.height = pixi_renderer.height*0.85;
	mask.anchor.set(0.5);
	mask.x = width*0.52;
	mask.y = height*0.57;
    stage.addChild(mask);
	videoSprite._mask = mask;
    stage.addChild(videoSprite);
	
	var team = PIXI.Sprite.fromImage("images/team_silhouette.png");
	team.anchor.set(0.5,0.65);
	team.x = width / 2;
	team.y = height;
	//logo.blendMode = PIXI.BLEND_MODES.ADD;
	blur = new PIXI.filters.BlurFilter(16, 2, 4, 11);
	//blur.blurY = 20;
	team.filters = [blur];
	stage.addChild(team);
}

function pixi_animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(pixi_animate);
    count+=0.01
    smokeShader.uniforms.time.value = count;
    //console.log(smokeShader.uniforms.time);
    // this is the main render call that makes pixi draw your container and its children.
    pixi_renderer.render(stage);
}
var width = window.innerWidth;
var height = window.innerHeight;
var pixi_renderer;
var stage;
// smoke shader
var uniforms = {};
uniforms.resolution = {type: "v2", value: {x: width, y: height}};
uniforms.alpha = {type: "1f", value: 1.0};
uniforms.shift = {type: "1f", value: 1.6};
uniforms.time = {type: "1f", value: 0};
uniforms.speed = {type: "v2", value: {x: 0.7, y: 0.4}};

var shaderCode;
var shaderContainer;
var smokeShader;
var bg;
var team;
var count = 0;

//SHADER_LOADER.load(
function shaderLoad(data) {
    shaderCode = data.smoke.fragment;
    // v3
    smokeShader = new PIXI.AbstractFilter(null, shaderCode, uniforms);
    // v4
    //smokeShader = new PIXI.Filter(null, shaderCode, uniforms);
    bg.filters = [smokeShader];
    bg.width = width;
    bg.height = height;
    stage.addChild(bg);
    // Team silhouette
    team = PIXI.Sprite.fromImage("textures/pixi/siluetas.png");
    team.anchor.set(0.5, 0.9);
    var textureRatio = 1920 / 441;
    var newWidth = pixi_renderer.width < 1280 ? 1280 : pixi_renderer.width;
    team.width = newWidth;
    team.height = newWidth / textureRatio * 1.1;
    team.x = pixi_renderer.width / 2;
    team.y = pixi_renderer.height;
    stage.addChild(team);
}
//);
function rendererResize() {
    console.log("App 2D: Resize handler called.");
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    pixi_renderer.resize(screenWidth, screenHeight);
    bg.width = screenWidth;
    bg.height = screenHeight;
    //uniforms.resolution = {type: "v2", value: {x: screenWidth, y: screenHeight}};
    smokeShader.uniforms.resolution = {x: screenWidth, y: screenHeight};
    team.x = screenWidth / 2;
}
function pixi_init() {
    //The stage is the root container that will hold everything in our scene
    stage = new PIXI.Container();
    shaderContainer = document.getElementById("app2d_cont");
    //Chooses either WebGL if supported or falls back to Canvas rendering
    pixi_renderer = new PIXI.autoDetectRenderer(width, height, {antialias: true, autoResize: true, transparent: true, resolution: 1});
    //pixi_renderer = new PIXI.autoDetectRenderer(width, height, shaderContainer, true);
    pixi_renderer.view.className = "pixi";
    //Add the render view object into the page
    shaderContainer.appendChild(pixi_renderer.view);
    bg = PIXI.Sprite.fromImage("textures/pixi/pixi.png");
    // Bind Events
    window.addEventListener("resize", rendererResize, false);

}
function pixi_animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(pixi_animate);
    count += 0.01;
    if (typeof smokeShader != "undefined") {
        smokeShader.uniforms.time.value = count;
    }
    // this is the main render call that makes pixi draw your container and its children.
    pixi_renderer.render(stage);
}

/* PURGED code */
/* ----------- */
/*
// FILTER
//logo.blendMode = PIXI.BLEND_MODES.ADD;
blur = new PIXI.filters.BlurFilter(16, 2, 4, 11);
//blur.blurY = 20;
team.filters = [blur];
/*
// VIDEO AND MASK TEXTURES
// create a video texture from a path
var video = PIXI.Texture.fromVideo("videos/BBB_720.mp4");
video.baseTexture.source.autoplay = false;
video.baseTexture.source.currentTime = 0;
video.baseTexture.source.loop = true;
video.baseTexture.source.muted = true;
// create a new Sprite using the video texture (yes it"s that easy)
var videoSprite = new PIXI.Sprite(video);
// Stetch the fullscreen
videoSprite.width = pixi_renderer.width;
videoSprite.height = pixi_renderer.height;
videoSprite.alpha = 0.25;
//stage.addChild(videoSprite);
//Video Mask
var mask = PIXI.Sprite.fromImage("images/arcade_mask.png");
mask.width = pixi_renderer.height*0.85;
mask.height = pixi_renderer.height*0.85;
mask.anchor.set(0.5);
mask.x = pixi_renderer.width*0.52;
mask.y = pixi_renderer.height*0.57;
stage.addChild(mask);
videoSprite._mask = mask;
stage.addChild(videoSprite);
*/
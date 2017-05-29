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
	shaderCode = document.getElementById( 'fragShader' ).innerHTML;
	shaderContainer = document.getElementById( 'smoke_cont' );
	console.log(shaderContainer);
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
	bg.filters = [smokeShader]
	stage.addChild(bg);
}

function pixi_animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(pixi_animate);

    count+=0.01
    smokeShader.uniforms.time.value = count;
    //console.log(smokeShader.uniforms.time);
    //console.log(smokeShader);
    // this is the main render call that makes pixi draw your container and its children.
    pixi_renderer.render(stage);
}
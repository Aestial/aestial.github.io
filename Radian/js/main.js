// GLOBAL CONTROL
var debug = true;
// ENUMS
var CSSAnimType = Object.freeze({Entrance:1, Exit:2, Fixed:3});
var deleteLog = false;
var imageActive = false;
var imageNames = ["French.jpg","Dog.jpg","Chilaquil.jpg","Pug.jpg"];
var isPlaying = false;
var loaded = false;
var loadBar;

// LOAD MANAGER (THREE)
var manager = new THREE.LoadingManager();
manager.onStart = function( item, loaded, total ) {
    console.log( 'Loading started' );
};
manager.onLoad = function() {
    $('#logo').hover(function(){
    	$('#loadScreen').animateOnce('fadeOut');
    	$.fn.fullpage.setAllowScrolling(true);
    });
    $('#loadBar').animateOnce('fadeOut');
    $('#logo').animateOnce('tada');
    console.log('Loading complete');
    $('#fullpage').fullpage.moveTo('about');
};
manager.onProgress = function( item, loaded, total ) {
    //console.log( item, loaded, total );
    loadBar.set((loaded*100.0)/total*1.0)
};
manager.onError = function( url ) {
    console.log( 'Error loading' );
};

// MAIN ON LOADED (Javascript method)
window.addEventListener( 'load', OnLoaded, false );
function OnLoaded() {
	loadBar = document.getElementById('loadBar').ldBar;
	fullpage_init();
	init();
	pixi_init();
	if (debug) initGUI();			
	loaded = true;
	animate();
	pixi_animate();
}

// ON LOADED (Jquery ready method)
//$(document).ready(function() {
function fullpage_init() {
	$('#fullpage').fullpage({
		sectionsColor: ['rgba(0,0,0,0)'],
		anchors: ['about', 'edesign', 'vfx', 'videogames', 'contact'],
		recordHistory: false,
		menu: '#menu',
		onLeave: function(index, nextIndex, direction){
			if(deleteLog){
				$('#callbacksDiv').html('');
			}
			$('#callbacksDiv').append('<p>onLeave - index:' + index + ' nextIndex:' + nextIndex + ' direction:' + direction + '</p>')
			//console.log("onLeave--" + "index: " + index + " nextIndex: " + nextIndex + " direction: " +  direction);
			hideBigImage();
			// MENU
			switch (index) {
				case 1:
					switch(nextIndex){
						case 2:
							$("#title").animateOnce('fadeOutUpBig', true, "block");
							$("#title-logo").animateOnce('bounceInDown', true);
							break;
						default:
							break;
					}
					break;
				case 2:
					switch(nextIndex){
						case 1:
							$("#title-logo").animateOnce('bounceOutUp', true);
							$("#title").animateOnce('fadeInDownBig', true, "block");
							break;
						default:
							break;
					}
					break;
				case 4:
					switch(nextIndex){
						case 5:
							$("#title-logo").animateOnce('bounceOutUp', true);
							$("#title").animateOnce('fadeInDownBig', true, "block");
							break;
						default:
							break;
					}
					break;
				case 5:
					switch(nextIndex){
						case 4:
							$("#title").animateOnce('fadeOutUpBig', true, "block");
							$("#title-logo").animateOnce('bounceInDown', true);
							break;
						default:
							break;
					}
					break;
				default:
				break;
			}/*
			$("#title").css({
				"display":((index==1||index==5)?"block":"none")
			}).animateOnce('fadeInDown');
			$("#title-logo").css({
				"display":((index>1&&index<5)?"initial":"none")
			}).animateOnce('bounceInDown');*/
		},
		afterRender: function(){
			$('#callbacksDiv').append('<p>afterRender</p>');
			//console.log("afterRender");
		},
		afterResize: function(){
			$('#callbacksDiv').append('<p>afterResize</p>');
			console.log("afterResize");
		},
		afterLoad: function(anchorLink, index){
			if (loaded) {
				TriggerAnim(index);
			}
			console.log("after Load  " + index);
			$('#callbacksDiv').append('<p>afterLoad - anchorLink:' + anchorLink + " index:" + index + '</p>');
			deleteLog = true;
			//console.log('===============');
			//console.log("afterLoad--" + "anchorLink: " + anchorLink + " index: " + index );
		}
	});
	$('#fullpage').fullpage.setAllowScrolling(false);
//});
}
function checkAnimType(animationName) {
	if (animationName.includes("In")){
		return CSSAnimType.Entrance;
	} else if (animationName.includes("Out")){
		return CSSAnimType.Exit;
	} else {
		return CSSAnimType.Fixed;
	}
	return 0;
}
$.fn.extend({
    animateOnce: function (animationName, display=false, displayValue="initial") {
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    	var type = checkAnimType(animationName);
		isPlaying = true;
    	switch (type) {
    		case CSSAnimType.Entrance:
				this.addClass('animated ' + animationName).one(animationEnd, function() {
		        	isPlaying = false;
					console.log("CSS Animation finished. (Entrance)");
		            $(this).removeClass('animated ' + animationName);
		        }).css( (display)?
		        		{"display":displayValue}:
		        		{"visibility":"visible"}
		        );
    			break;
    		case CSSAnimType.Exit:
	    		this.addClass('animated ' + animationName).one(animationEnd, function() {
		        	isPlaying = false;
					console.log("CSS Animation finished. (Exit)");
		            $(this).removeClass('animated ' + animationName)
		            .css( (display)?
		        		  {"display":"none"}:
		        		  {"visibility":"hidden"}
		        	);
		        });
    			break;
    		case CSSAnimType.Fixed:
	    		this.addClass('animated ' + animationName).one(animationEnd, function() {
		        	isPlaying = false;
					console.log("CSS Animation finished. (Fixed)");
		            $(this).removeClass('animated ' + animationName)
		        });
    			break;
    		default:
    			break;
    	}
    }
});
function toggleBigImage(index) {
	if (!isPlaying) {
		if (imageActive) hideBigImage();
		else showBigImage(index);	
	}
}
function showBigImage(index) {
	if (!imageActive) {
		var imageName = imageNames[index];
		$('#bigImage').css({
        	"background-image": "url('images/"+imageName+"')"
        }).animateOnce('fadeInRight');
		$( '.bigImage_toggle' ).text( "Close project" );
		imageActive = true;	
	}
}
function hideBigImage() {
	if (imageActive) {
		$('#bigImage').animateOnce('fadeOutRight');
		$( '.bigImage_toggle' ).text( "View project" );
		imageActive = false;	
	}
}
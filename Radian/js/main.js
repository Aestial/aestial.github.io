// GLOBAL CONTROL
var debug = true;
// ENUMS
var CSSAnimType = Object.freeze({Entrance:1, Exit:2, Fixed:3});
var deleteLog = false;
var imageActive = false;
var imageNames = ["French.jpg","Dog.jpg","Chilaquil.jpg","Pug.jpg"];
var isPlaying = false;
var isLoaded = false;
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
    if (!debug) {
    	$('#fullpage').fullpage.moveTo('aboutus');	
    }
    isLoaded = true;
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
	//if (debug) initGUI();			
	animate();
	pixi_animate();
}

// ON LOADED (Jquery ready method)
//$(document).ready(function() {
function fullpage_init() {
	$('#fullpage').fullpage({
		sectionsColor: ['rgba(0,0,0,0)'],
		anchors: ['aboutus', 'edesign', 'vfx', 'videogames', 'contact'],
		recordHistory: false,
		menu: '#menu',
		onLeave: function(index, nextIndex, direction){
			//console.log("onLeave--" + "index: " + index + " nextIndex: " + nextIndex + " direction: " +  direction);
			hideBigImage();
			// MENU
			switch (index) {
				case 1:
					switch(nextIndex){
						case 5:
							break;
						default:
							$("#title").animateOnce('fadeOutUpBig', true, "block");
							$("#title-logo").animateOnce('bounceInDown', true);
							break;
					}
					break;
				case 2:
					switch(nextIndex){
						case 1:
						case 5:
							$("#title-logo").animateOnce('bounceOutUp', true);
							$("#title").animateOnce('fadeInDownBig', true, "block");
							break;
						default:
							break;
					}
					break;
				case 3:
					switch(nextIndex){
						case 1:
						case 5:
							$("#title-logo").animateOnce('bounceOutUp', true);
							$("#title").animateOnce('fadeInDownBig', true, "block");
							break;
						default:
							break;
					}
					break;
				case 4:
					switch(nextIndex){
						case 1:
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
						case 1:
							break;
						default:
							$("#title").animateOnce('fadeOutUpBig', true, "block");
							$("#title-logo").animateOnce('bounceInDown', true);
							break;
					}
					break;
				default:
				break;
			}
		},
		afterRender: function(){
			//console.log("afterRender");
		},
		afterResize: function(){
			//console.log("afterResize");
		},
		afterLoad: function(anchorLink, index){
			//console.log("afterLoad--" + "anchorLink: " + anchorLink + " index: " + index );
			if (isLoaded) {
				TriggerAnim(index);
			}
		}
	});
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

$(function() {
    // Get the form.
    var form = $('#ajax-contact');
    // Get the messages div.
    var formMessages = $('#form-messages');
    // Set up an event listener for the contact form.
	$(form).submit(function(event) {
	    // Stop the browser from submitting the form.
	    event.preventDefault();
	    // TODO
	    // Serialize the form data.
		var formData = $(form).serialize();
		// Submit the form using AJAX.
		$.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    data: formData
		}).done(function(response) {
		    // Make sure that the formMessages div has the 'success' class.
		    $(formMessages).removeClass('error');
		    $(formMessages).addClass('success');

		    // Set the message text.
		    $(formMessages).text(response);

		    // Clear the form.
		    $('#name').val('');
		    $('#email').val('');
		    $('#message').val('');
		}).fail(function(data) {
		    // Make sure that the formMessages div has the 'error' class.
		    $(formMessages).removeClass('success');
		    $(formMessages).addClass('error');

		    // Set the message text.
		    if (data.responseText !== '') {
		        $(formMessages).text(data.responseText);
		    } else {
		        $(formMessages).text('Oops! An error occured and your message could not be sent.');
		    }
		});
	});
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
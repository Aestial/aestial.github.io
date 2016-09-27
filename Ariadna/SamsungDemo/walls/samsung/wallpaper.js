/*
 * NOTE:
 *
 * This example is not meant for production use and should not be used
 * as the base of your project. Please keep in mind best practices and 
 * cross-browser/platform compability and best practices concerning 
 * number of requests, bandwidth, animation performance, etc.
 */

var Wallpaper = (function(){
    /* private */
    var player = null, line1, line2;
    var copies = [
	["Title One", "Sub One"],
	["Title Two", "Sub Two"],
	["Title Three", "Sub Three"]
    ];
    var defaultCopies = [];
    var copyIndex = 0;
    var copyTimeInterval = 5000;
    var interval;

    // Create and append the video container.
    function create_container()
    {
	// Make the container match the viewport width/height
	var container = document.createElement('div');
	container.setAttribute('class', 'video-container');

	// The video container will use negative offsets and dimensions
	// that are 'out of bounds' to make it appear fullscreen.
	var embed = document.createElement('div');
	embed.setAttribute('class', 'embed-container');
	container.appendChild(embed);

	// This will be replaced by the actual video element (YouTube).
	var placeholder = document.createElement('div');
	placeholder.setAttribute('id', 'video');
	placeholder.setAttribute('class', 'placeholder');
	embed.appendChild(placeholder);

	// Add it to the document.
	document.querySelector('body').appendChild(container);
	return container;
    };

    /* youtube events */
    window['onPlayerStateChange'] = function(e)
    {
	// If the video has completed hide it (and track the event)
	if (e.data !== 0) return;
	if (wetransfer) wetransfer.vast('complete');
	Wallpaper.hideVideo();
    };

    window['onYouTubePlayerAPIReady'] = function()
    {
	// Load the video with as minimal interface as possible
	player = new YT.Player('video', {
	    height: '100%',
	    width: '100%',
	    videoId: Wallpaper.id,
	    playerVars: {
		autoplay: '0',
		modestbranding: '1',
		controls: '0',
		rel: '0',
		showinfo: '0',
		enablejsapi: '1',
		wmode: 'transparent',
		html5: 1,
		iv_load_policy: 3,		
		start: 180,
		end: 224,
		/*
		loop: 1,
		playlist: "hBmnOyhlE_c?start=208&end=224"
		*/
	    },
	    events: {
		'onStateChange': window['onPlayerStateChange']
	    }
	});
    };

    

    /* Copies looping */
    function change_copies () {
	// Get doms
	line1 = document.getElementById("line1");
	line2 = document.getElementById("line2");
	// Get Original Messaage
	defaultCopies[0] = line1.innerHTML;
	defaultCopies[1] = line2.innerHTML;
	// Change style
	line1.style.color = line2.style.color = "white";
	// Set loop function
	interval = setInterval(loop_copies, copyTimeInterval);	    
    };

    function loop_copies () {
	line1.innerHTML = copies[copyIndex][0];
	line2.innerHTML = copies[copyIndex][1];
	copyIndex++;
	if ( copyIndex >= copies.length ) {
	    copyIndex = 0;
	}	    
    };

    function reset_copies () {
	line1.innerHTML = defaultCopies[0];
	line2.innerHTML = defaultCopies[1];
	line1.style.color = line2.style.color = "black";
	clearInterval(interval);
    }

    /* public */
    function VideoBackground()
    {
	this.container = create_container();
	this.embed = this.container.querySelector('.embed-container');
	this.cta = null;
	this.id = null;

	// load youtube api
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/player_api";
	var script = document.querySelector('script');
	script.parentNode.insertBefore(tag, script);

	// We have to handle the wallpaper click ourselves.
	var self = this;
	document.addEventListener('click', function(e){
	    var el = e.srcElement || e.target;
	    // But if this is the 'play button' don't use the click action.
	    if (el === self.cta) { 
		return false;
	    }

	    // Click! (Unless API is not loaded)
	    if (wetransfer) {
		wetransfer.click();
	    }
	}, false);

	// bind resize event
	window.addEventListener('resize', function(){
	    self.fitToSize();
	}, false);
    };

    VideoBackground.prototype.setCTA = function(selector)
    {
	var el = document.querySelector(selector);
	if (!el) {
	    return alert('no cta found, cannot continue.');
	}

	// Find the video id (for YouTube)
	var id = el.getAttribute('href').match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
	if (id.length != 2) return alert('invalid cta url');
	this.id = id[1];

	// Bind the click event
	var self = this;
	this.cta = el;
	this.cta.addEventListener('click', function(e){
	    self.showVideo();
	    e.stopPropagation();
	    e.preventDefault();
	    return false;
	}, false);
    };

    VideoBackground.prototype.showVideo = function()
    {
	if (!this.id || !player) return;
	this.fitToSize();
	this.container.style.opacity = 1;
	if (wetransfer) {
	    wetransfer.appHide(); // Move the WeTransfer Uploader to the left 
	    wetransfer.pauseTimer(); // Pause the WeTransfer Rotation timer.
	    wetransfer.vast('play'); // Track the play event
	}
	player.playVideo();
	change_copies();
    };

    VideoBackground.prototype.hideVideo = function()
    {
	if (!this.id) return;
	this.container.style.opacity = 0;
	if (wetransfer) {
	    wetransfer.appShow(); // Move the WeTransfer Uploader to it's normal position
	    wetransfer.resumeTimer(); // Resume the WeTransfer Rotation timer.
	}
	reset_copies();
    };

    // Fix video placement to fit screen.
    VideoBackground.prototype.fitToSize = function()
    {
	if (!this.id) return;
	
	// this is for demo purposes, does not work for all aspect ratios

	var win = {};
	var padding = 20;
	var margin = 24;
	var iframe = player.getIframe();
	var embed = document.querySelector('.video-container .embed-container');
	var vid = {};

	win.width = window.innerWidth;
	win.height = window.innerHeight;
	vid.width = win.width + ((win.width * margin) / 100);
	vid.height = Math.ceil((9 * win.width) / 16);
	vid.marginTop = -((vid.height - win.height) / 2);
	vid.marginLeft = -((win.width * (margin / 2)) / 100);

	if (vid.height < win.height) {
	    vid.height = win.height + ((win.height * margin) / 100);
	    vid.width = Math.floor((16 * win.height) / 9);
	    vid.marginTop = -((win.height * (margin / 2)) / 100);
	    vid.marginLeft = -((vid.width - win.width) / 2);
	}

	vid.width += padding;
	vid.height += padding;
	vid.marginTop -= padding / 2;
	vid.marginLeft -= padding / 2;

	embed.style.width = vid.width + 'px';
	embed.style.height = vid.height + 'px';
	embed.style.marginTop = vid.marginTop + 'px';
	embed.style.marginLeft = vid.marginLeft + 'px';
    };

    return new VideoBackground;
})();

/*
 * WeTransfer Application Simulator
 *
 * This will simulate the production WeTransfer Application for
 * some cross-origin messaging commands.
 */

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

(function(language, backgrounds){
  var backgrounds = backgrounds || [];
  var language = language || 'en';


  // Only run on server.
  if (!location.protocol.match('http') && !location.protocol.match('https')) {
    return alert('ERROR: You can only test this on a (local) web server.');
  }


  // Simple nice looking logging.
  var Log = {
    'api': function(message) {
      return console.info('API:', message);
    },
    'info': function(message) {
      return console.info('INFO:', message);
    },
    'error': function(message) {
      return console.error('ERROR:', message);
    }
  };


  // API stub
  var API = {};
  API.hide = function()
  {
    var app = document.querySelector('#app');
    app.style.left = '-255px';
    Log.info('hiding the WeTransfer Application');
  };

  API.show = function()
  {
    var app = document.querySelector('#app');
    app.removeAttribute('style');
    Log.info('showing the WeTransfer Application');
  };

  API.change = function()
  {
    clearInterval(Wallpaper.timer);
    Wallpaper.rotate();
    Log.info('changing the wallpaper');
  };

  API.pauseTimer = function()
  {
    Wallpaper.pause();
    Log.info('Paused wallpaper rotation');
  };

  API.resumeTimer = function()
  {
    Wallpaper.resume();
    Log.info('Resuming wallpaper rotation');
  };

  API.resetTimer = function()
  {
    Wallpaper.reset();
    Log.info('Reset the wallpaper rotation');
  };

  API.toggleDragOver = function()
  {
    Log.info('Dragging files over frame');
  };

  API.getState = function(requester)
  {
    Log.info('State requested via ' + requester);

    var now = new Date().getTime();
    var end = (Wallpaper.started.getTime() + Wallpaper.interval) + Wallpaper.offset;
    var remaining = Wallpaper.interval - Math.abs((now - end)/1000);

    var state = Wallpaper.state(remaining);
    state['requester'] = requester;
    Wallpaper.send('update', state);
  };

  API.vast = function(name, filename)
  {
    Log.info('Executing vast::' + name + (filename ? '(\'' + filename + '\')' : ''));
  };


  // (static) Wallpaper object.
  var Wallpaper = {
    'container': null,
    'interval': 45, // in seconds
    'current': 0, 
    'offset': 0,
    'paused': null,
    'started': null,
    'timer': null,
    'host': location.origin
  };


  // Create the wallpaper iframe.
  Wallpaper.create = function()
  {
    this['container'] = document.querySelector('#wallpaper');
    this['container'].addEventListener('load', function(e){
      Log.info('Sending start signal to Wallpaper');
      Wallpaper.start();
      Wallpaper['container'].style.opacity = '1';
    }, false);
  };


  // Start the wallpaper rotation
  Wallpaper.rotate = function()
  {
    if (!this['container']) {
      this.create();
    }

    if (backgrounds.length == 0) {
      alert('ERROR: No backgrounds are defined');
      return Log.error('No backgrounds were defined.');
    }

    // Get the url for the wallpaper
    var url = backgrounds[this.current];

    // Add the parents origin
    url += (!!url.match(/\?/) ? '&' : '?') + '_origin=' + window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    url += '&_cr=' + Math.round(Math.random()*1000000000);

    Log.info('Loading wallpaper: ' + url);
    this['container'].style.opacity = '0';
    this['container'].setAttribute('src', url);

    // Next time rotate is called, show the next one (or first one)
    this.current = (this.current + 1) % backgrounds.length;
  };


  // Get wallpaper state
  Wallpaper.state = function(remaining)
  {
    var app = document.querySelector('#app');

    return {
      'language': language,
      'remaining': remaining,
      'appPosition': {
        'x': app.offsetTop + 56, // manually add padding from image
        'y': app.offsetTop + 46, // manually add padding from image
        'width': app.offsetWidth - 122, // manually remove padding from image
        'height': app.offsetHeight - 111 // manually remove padding from image
      }
    };
  };


  // Wallpaper is loaded, send start signal
  Wallpaper.start = function(resume)
  {
    clearInterval(this.timer);

    // Is this a first run or restart?
    if (!resume) {
      var initialState = Wallpaper.state(this.interval);
      initialState['_click'] = 'https://www.wetransfer.com';
      this.send('start', initialState);
      this.started = new Date();
      this.paused = null;
      this.offset = 0;
    }

    this.timer = setInterval(function(){
      var now = new Date().getTime();
      var end = (Wallpaper.started.getTime() + Wallpaper.interval) + Wallpaper.offset;
      var remaining = Wallpaper.interval - Math.abs((now - end)/1000);

      // Is it time to refresh?
      if (remaining <= 0) {
        clearInterval(Wallpaper.timer);
        Wallpaper.rotate();
        return;
      }

      Wallpaper.send('update', Wallpaper.state(remaining));
    }, 50);
  };


  // Pause the rotating wallpapers
  Wallpaper.pause = function()
  {
    this.paused = new Date();
    clearInterval(this.timer);
  };


  // Resume the rotating wallpapers
  Wallpaper.resume = function()
  {
    if (!this.paused) return;

    // Calculate the new starting point
    var remaining = new Date();
    var end = this.paused.getTime();
    var difference = (remaining - end);

    // And resume
    this.offset += difference;
    this.paused = null;
    Wallpaper.start(true);
  };


  // Reset the rotating wallpapers
  Wallpaper.reset = function()
  {
    Wallpaper.pause();
    this.started = new Date();
    Wallpaper.start(true);
  };


  // Send message to the wallpaper
  Wallpaper.send = function(command/*, arguments*/)
  {
    if (!this['container']) return false; 
    var frame = this['container'].contentWindow;
    var payload = {
      'command': command,
      'data': Array.prototype.slice.call(arguments, 1)
    };

    if (!frame) return;
    frame.postMessage(JSON.stringify(payload), Wallpaper.host);
  };

  // Receiving data from wallpaper.
  Wallpaper.receive = function(e)
  {
    // Verify origin
    if (e.origin != Wallpaper.host) return false;

    // Try to parse JSON.
    try {
      var payload = JSON.parse(e.data);
    } catch(e){ return false; }


    // Check if command exists.
    if (!payload.command || !(payload.command in API)) {
      Log.error('Unknown API command');
      return false;
    }

    Log.api('executing wetransfer::' + payload.command + '();');

    // Execute!
    API[payload.command].apply(API, payload.data || []);
  };


  // Listen for new events
  window.addEventListener('message', function(e){
    Wallpaper.receive(e);
  }, false);


  // Start the wallpaper
  Log.info('Wallpaper rotation starting');
  Wallpaper.rotate();
})(language, backgrounds);
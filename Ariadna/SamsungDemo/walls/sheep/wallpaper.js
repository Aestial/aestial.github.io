/*
 * NOTE:
 *
 * This example is not meant for production use and should not be used
 * as the base of your project. Please keep in mind best practices and 
 * cross-browser/platform compability and best practices concerning 
 * number of requests, bandwidth, animation performance, etc.
 */

function positionStage() {
  // Determine viewport dimensions
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  // Determine the resized scale
  var scaleWidth = viewportWidth / 1680;
  var scaleHeight = viewportHeight / 1050;
  var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;
  if (scale * 1680 < 320) { // minimum of 320
    scale = 320 / 1680;
  };

  // Place the stage
  var stage = document.querySelector('#stage');
  stage.style.transform =
  stage.style.msTransform =
  stage.style.mozTransform =
  stage.style.webkitTransform = 'scale(' + scale + ')';
  stage.style.marginTop = parseInt(0 - (1050 / 2), 10) + 'px';
  stage.style.marginLeft = parseInt(0 - (1680 / 2), 10) + 'px';
};

window.addEventListener('resize', positionStage);
positionStage();
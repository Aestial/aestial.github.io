// ENUM
var CSSAnimType = Object.freeze({Entrance:1, Exit:2, Fixed:3});

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
// Date(year, month, day, hours, minutes, seconds, milliseconds)
var dDate = new Date(2016, 11, 25, 16, 30, 0, 0);
var counter = document.getElementById('counter');
var request;
var timespan;

function update () {
    timespan = countdown(dDate);
    counter.innerHTML = timespan.toString();
    //console.log(timespan.toString());
    request = window.requestAnimationFrame(update);
}
request = window.requestAnimationFrame(update);

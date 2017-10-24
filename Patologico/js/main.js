var colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'white', 'yellow'];

window.onload = function () {
  var g = Snap();
  g.attr({
    viewBox: [0, 0, 640, 873]
  });
  Snap.load("svg/patologico.svg", function (f) {
    //var camisa = f.select("#camisa").attr({fill: "#fff"});
    var camisa = f.select("#camisa"),
    camisaC = f.select("#camisa-color"),
    camisaO = f.select("#camisa-out"),
    corbataC = f.select("#corbata-color");
    var top = g.g();
    top.add(camisaC);
    top.add(camisaO);
    top.add(corbataC);
    window.onclick = function () {
      var color = colors[Math.floor(Math.random() * colors.length)];
      camisa.attr({fill: color});
    };
  });
};

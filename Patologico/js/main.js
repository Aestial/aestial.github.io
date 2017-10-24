var colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'white', 'yellow'];

window.onload = function () {
  var g = Snap();
  g.attr({
    viewBox: [0, 0, 640, 873]
  });
  Snap.load("svg/patologico.svg", function (f) {
    var camisa = f.select("#camisa"),
    root = f.select("#root");
    var top = g.g();
    top.add(root);
    window.onclick = function () {
      var color = colors[Math.floor(Math.random() * colors.length)];
      camisa.attr({fill: color});
    };
  });
};

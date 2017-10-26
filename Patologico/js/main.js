var colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'white', 'yellow'];

window.onload = function () {
  var g = Snap();
  g.attr({
    viewBox: [0, 0, 640, 873]
  });
  Snap.load("svg/patologico.svg", function (f) {
    var root = f.select("#root"),
    camisa = f.select("#camisa"),
    corbata = f.select("#corbata"),
    rombos = f.select("#rombos");
    var top = g.g();
    top.add(root);
    console.log(rombos.children());
    window.onclick = function () {
      var color = colors[Math.floor(Math.random() * colors.length)];
      var color2 = colors[Math.floor(Math.random() * colors.length)];
      var color3 = colors[Math.floor(Math.random() * colors.length)];
      camisa.attr({fill: color});
      corbata.attr({fill: color2});
      cambiaRombos(color3);
    };
    function cambiaRombos (color)
    {
      for(var i = 0; i < rombos.children().length; i++)
      {
        if (rombos.children()[i].type == "rect"
         || rombos.children()[i].type == "path")
        {
          console.log(rombos.children()[i].type);
          rombos.children()[i].attr({fill: color});
        }
      }
    }
  });
};

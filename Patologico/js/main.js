var colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
'silver', 'teal', 'white', 'yellow'];
var camisa_colors = [
  "#333333",
  "#666a86",
  "#95b8d1",
  "#e8ddb5",
  "#edafb8"
];
var corbata_colors = [
  "#143109",
  "#aaae7f",
  "#d0d6b3",
  "#f7f7f7",
  "#efefef"
];
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
    Snap.load("svg/Camisa.svg", function(f) {
      var root = f.select("#root");
      var index = 0;
      var clickFunc = function () {
        index++;
        var color = camisa_colors[index%camisa_colors.length];
        camisa.attr({fill: color});
      };
      var hoverFunc = function () {
        console.log("Hover Camisa lol!");
      };
      root.click( clickFunc );
      root.hover( hoverFunc );
      root.transform( 't700,100');
      var top = g.g();
      top.add(root);
    });
    Snap.load("svg/Corbata.svg", function(f) {
      var root = f.select("#root");
      var index = 0;
      var clickFunc = function () {
        index++;
        var color = corbata_colors[Math.floor(Math.random() * corbata_colors.length)];
        var color2 = corbata_colors[Math.floor(Math.random() * corbata_colors.length)];
        corbata.attr({fill: color2});
        for(var i = 0; i < rombos.children().length; i++)
        {
          if (rombos.children()[i].type == "rect"
           || rombos.children()[i].type == "path")
          {
            console.log(rombos.children()[i].type);
            rombos.children()[i].attr({fill: color});
          }
        }
      };
      var hoverFunc = function () {
        console.log("Hover Corbata lol!");
      };
      root.click( clickFunc );
      root.hover( hoverFunc );
      root.transform( 't735,250');
      var top = g.g();
      top.add(root);
    });
  });
};

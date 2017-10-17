var colors = ['red', '#000000', 'green', 'blue', 'orange', 'yellow'];
function svgMod()
{
  var camisa_fill_color = document.getElementById("camisa_fill");
  console.log(camisa_fill_color);
  camisa_fill_color.style.fill = colors[Math.floor(Math.random() * colors.length)];
}

// Date(year, month, day, hours, minutes, seconds, milliseconds)
var dDate = new Date(2017, 05, 27, 16, 30, 0, 0);
var counter = document.getElementById('counter');
countdown.setLabels(
    ' milissegundo| segundo| minuto| hora| dia| semana| mês| ano| década| século| milênio',
    ' milissegundos| segundos| minutos| horas| dias| semanas| meses| anos| décadas| séculos| milênios',
    ' e ',
    ' + ',
    'agora');
var request;
var timespan;

function update () {
    timespan = countdown(dDate, null, countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS );
    counter.innerHTML = timespan.toString();
    //console.log(timespan.toString());
    request = window.requestAnimationFrame(update);
}
request = window.requestAnimationFrame(update);

    var container = document.getElementsByTagName('canvas')[0];
    var round = container.getContext('2d');
    var hour = container.getContext('2d');
    var i = 0;
    setInterval(function(){
        console.log(hour.rotate(30 * Math.PI/180));
    },1000);
    round.beginPath();
    round.arc(150,75,60,0,2*Math.PI,false);
    round.closePath();
    round.stroke();
    hour.beginPath();    
    hour.translate(150,75);
    hour.moveTo(0,0);
    hour.lineTo(0,-35);
    hour.closePath();
    hour.stroke();
    window.onload = function(){

    }

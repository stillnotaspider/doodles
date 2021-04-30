// Circles - circle packing based something

var w = window.innerWidth;
var h = window.innerHeight;
var s = 20;
function setup() {
    createCanvas(w,h);
    noLoop();
    strokeWeight(2);
}

function draw() {
    for(let i = 0; i<w/s; i++) {
        for(let j = 0; j < h/s; j++) {
            if(random()<0.5) line(s*i,s*j,s*(i+1),s*(j+1))
            else line(s*(i+1),s*j, s*i, s*(j+1));
        }
    }
}

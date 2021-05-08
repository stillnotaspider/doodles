var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
    createCanvas(w,h);
    frameRate(10);
    stroke(0,100);
    rotate(PI/2);
}


function draw() {
    background(255);
    tree(10,200,w/2,(PI/2)*(mouseX/w),0,50 + 20*(mouseY/h),80,80,80);
}

function mousePressed() {
    redraw();
}

function tree(n,x,y,theta,psi,l,r,g,b) {
    if(n==0) return;
    strokeWeight(n);
    var r1 = r + random(-5,20);
    var g1 = g + random(-5,20);
    var b1 = b + random(-5,20);
    var r2 = r + random(-5,20);
    var g2 = g + random(-5,20);
    var b2 = b + random(-5,20);
    var x1 = x + l*cos(psi + theta);
    var y1 = y + l*sin(psi + theta);
    var x2 = x + l*cos(psi - theta);
    var y2 = y + l*sin(psi - theta);
    stroke(0,g1,b1,230);
    line(y,x,y1,x1);
    stroke(0,g2,b2,230);
    line(y,x,y2,x2);
    tree(n-1,x1,y1,theta,psi+theta,l*0.8,r1,g1,b1);
    tree(n-1,x2,y2,theta,psi-theta,l*0.8,r2,g2,b2);
}

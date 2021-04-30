// Circles - circle packing based something

var w = window.innerWidth;
var h = window.innerHeight;

var Circles = [];
var R_max = 35;
var R_min = 5;

var more_colours = [
    {
        r:217, 
        g:237, 
        b:146 
    },
    {
        r:181, 
        g:283, 
        b:140 
    },
    {
        r:153, 
        g:217, 
        b:140 
    },
    {
        r:118, 
        g:200, 
        b:147 
    },
    {
        r:82, 
        g:182, 
        b:154 
    },
    {
        r:52, 
        g:160, 
        b:164 
    },
    {
        r:22, 
        g:138, 
        b:173 
    },
    {
        r:26,
        g:117,
        b:159
    },
    {
        r:30, 
        g:96, 
        b:145 
    },
    {
        r:24, 
        g:78, 
        b:119 
    }];

var colours = [
    {
        r:247, 
        g:37, 
        b:133 
    },
    {
        r:181, 
        g:23, 
        b:158 
    },
    {
        r:114, 
        g:9, 
        b:183 
    },
    {
        r:86, 
        g:11, 
        b:173 
    },
    {
        r:86, 
        g:12, 
        b:168 
    },
    {
        r:58, 
        g:12, 
        b:163 
    },
    {
        r:63, 
        g:55, 
        b:201 
    },
    {
        r:67, 
        g:97, 
        b:238 
    },
    {
        r:72, 
        g:149, 
        b:239 
    },
    {
        r:76, 
        g:201, 
        b:240 
    }
]

class C {
    constructor(x_,y_,r_,cr,cg,cb) {
        this.x = x_;
        this.y = y_;
        this.R = r_;
        this.r = 0;
        this.col_r = cr;
//        this.col_r = 0;
        this.col_g = cg;
        this.col_b = cb;
        this.alive = true;
        this.dying = 0;
    }

    d(x,y) {
        return(sqrt((this.x - x)**2 + (this.y - y)**2)); 
    }
}

function setup() {
    createCanvas(w,h);
    noStroke();
    frameRate(60);
    background(255);
}

function draw() {
    let index = 0;
    Circles.forEach(c => {
        if(c.r >= 2*c.R) c.alive = false;
        else if(c.r < 2*c.R) c.r += 1;
        
        if(c.alive) {fill(c.col_r,c.col_g,c.col_b,20);
//        else fill(255,3);
        circle(c.x,c.y,c.r+1);}

//        if(c.alive == false){
//            fill(255);
//            circle(c.x,c.y,c.r+1);
//            Circles.splice(index,1);
//        } 
        //else index += 1;
    });
    if(Circles.length < 1800 & random([1,2,3,4,5])<3) spawn();
}

function mousePressed() {
    background(255);
    Circles = [];
}

function spawn() {
    var x = int(random(R_max+10,w-R_max-10));
    var y = int(random(R_max+10,h-R_max-10));
    var r = R_max;    
    var col_r=0, col_g=0, col_b=0;
    var n = 0;
    if(Circles.length > 0) {
        Circles.forEach(c => {
            let d = c.d(x,y);
            let R = c.R;
            if(d-R < r) { 
                r = d-R;
                col_r = c.col_r;
                col_g = c.col_g;
                col_b = c.col_b;
                n = d;
            }
        });
    }
    else r = R_max;
    if(r > n | r >= R_max) {
//        col_r = int(random(10,275))%255;
//        col_g = int(random(20,275))%255;
//        col_b = int(random(20,275))%255;
            let col = random(colours);
            col_r = col.r;
            col_g = col.g;
            col_b = col.b;
    }
    if(r >= R_max) Circles.push(new C (x,y,R_max,col_r,col_g,col_b)); 
    else if(r > 5) Circles.push(new C (x,y,r-1,col_r,col_g,col_b));
    else spawn();
}
var w = window.innerWidth;
var h = window.innerHeight;

class Branch {
    constructor(ind_,x_,y_,move_x,move_y,level) {
        this.x = x_;
        this.y = y_;
        this.move_x = move_x;
        this.move_y = move_y;
        this.lvl = level;
        this.i = ind_;
    }
    grow() {
        this.x += this.move_x + random(-5,5);
        this.y += this.move_y + random(-5,5);
    }
}

class Tree {
    constructor(x_,y_) {
        this.root_x = x_;
        this.root_y = y_;
        this.speed = 1;
        this.col_r = 0;
        this.col_g = 0;
        this.col_b = 0;
        this.branches = [new Branch (0, this.root_x, this.root_y, 0, 20, 0)];
    }
    split(i) {
        let angle = level*PI/36
        let b1 = this.branches[i];
        let b2 = new Branch (this.branches.length,b1.x,b1.y,(b1.move_x + 15*cos(angle))/2, (b1.move_y + 15*sin(angle))/2,b1.level);
        b1.move_x = (b1.move_x - 15*cos(angle))/2;
        b1.move_y = (b1.move_y + 15*sin(angle))/2;
        b1.level += 1;
        this.branches.push(b2);
    }
    splitAll() {
        let n = this.branches.length;
        for(let i = 0; i<n; i++) this.split(i);
    }
}

var T;
function setup() {
    createCanvas(w,h);
    frameRate(0.5);
    T = new Tree (w/2,10);
}

function draw() {
    T.branches.forEach(b => {
        circle(b.x,b.y,5);
        b.grow();
    });
}

function mousePressed() {
    T.splitAll();
}
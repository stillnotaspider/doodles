var w = window.innerWidth;
var h = window.innerHeight;

var board,next,s=10,n_x,n_y;
var pause = true;
var nx,ny;

var cnt=0;
var switched = false

function setup() {
    createCanvas(w,h);
    init_board();
    frameRate(10);
}

let col = {
    r: 100,
    g: 100,
    b: 100
};

let col_move = {
    r:0,
    g:0,
    b:0
};

function change_col() {
    if(col.r < 50) col_move.r = random(-1,7);
    else if(col.r <100) col_move.r = random(-3,5);
    else if(col.r > 200) col_move.r = random(-5,2);
    else col_move.r = random(-3,4)

    if(col.g < 50) col_move.g = random(-1,7);
    else if(col.g <100) col_move.g = random(-3,5);
    else if(col.g > 200) col_move.g = random(-5,2);
    else col_move.g = random(-3,4)
    
    if(col.b < 50) col_move.b = random(-1,7);
    else if(col.b <100) col_move.b = random(-3,5);
    else if(col.b > 200) col_move.b = random(-5,2);
    else col_move.b = random(-3,4)
}

function init_board() {
    nx = floor(w/s);
    ny = floor(h/s);

    board = new Array(nx);
    next = new Array(nx);

    for(var i = 0; i < nx; i++) board[i] = new Array(ny);
    for(var i = 0; i<nx; i++) next[i] = new Array(ny);
    
    for(var i=0; i<nx; i++) for(var j=0; j<ny; j++) board[i][j] = 0;
}


function random_init(x) {
    for(var i=0; i<nx; i++) {
        for(var j=0; j<ny; j++) {
            if(random(100)<x) board[i][j] = 1;
             else board[i][j] = 0;
        }
    }
}

function n(x,y) { //number of neighbours of board[x][y], wraps around the 
    return(board[(x+1)%nx][(y+1)%ny] + board[(x+1)%nx][y] + board[(x+1)%nx][(ny+y-1)%ny] + board[x][(y+1)%ny] + board[x][(ny+y-1)%ny] + board[(nx+x-1)%nx][(y+1)%ny] + board[(nx+x-1)%nx][y] + board[(nx+x-1)%nx][(ny+y-1)%ny])
}

function draw() {
    background(0);
    /*if(pause) {
        stroke(0)
        for(var i=0; i<=ny;i++) line(i*s,0,i*s,nx*s);
        for(var i=0; i<=nx;i++) line(0,i*s,ny*s,i*s);
    }*/
    for(var i=0; i<nx; i++) {
        for(var j=0; j<ny; j++) {
            if(board[i][j]==1) {
                var temp = n(i,j);
                fill(255-i*(col.r)/nx, (i+j)*col.g/(nx*ny),255-j*(col.b)/ny);
                noStroke();
                rect(i*s,j*s,s,s);       
            }
        }
    }
    if(!pause) {
        col.r += col_move.r
        col.g += col_move.g
        col.b += col_move.b
        cnt += 1
        if(cnt == 15) {
            change_col();
            cnt = 0
        }
        move();
    }
}


function move() {
    for(var i=0; i<nx; i++) {
        for(var j=0; j<ny; j++) {
            var temp = n(i,j);
            if(board[i][j] == 0 & temp == 3) next[i][j] = 1;
            else if (board[i][j] == 1 && (temp < 2 | temp > 3)) next[i][j] = 0;
            else next[i][j] = board[i][j];
        }
    }
    for(var i=0; i<nx; i++) for(var j=0; j<ny; j++) board[i][j] = next[i][j];
    redraw();
}


function mousePressed() {
    var x = int(mouseX/s);
    var y = int(mouseY/s);
    console.log(x,y);
    if(board[x][y] == 0) board[x][y] = 1;
    else board[x][y] = 0;
}

function keyPressed() {
    if(keyCode == ENTER) pause = !pause
    else if(keyCode == UP_ARROW) {
        switched = true
    }
    else if(keyCode == DOWN_ARROW) {
        switched = false
    }
    else random_init(30);
}
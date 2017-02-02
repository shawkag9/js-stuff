const cellSize = 1;
const probAlive = 0.15;
let paused = false;
var cells;
var canvas;
var ctx;

function setup() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        // instantiate array
        cells = new Array(canvas.height/cellSize);
        for (var x = 0; x < canvas.height/cellSize; x++) {
            cells[x] = new Array(canvas.width/cellSize);
        }

        // generate cells
        for (var y = 0; y < canvas.height/cellSize; y++) {
            for (var x = 0; x < canvas.width/cellSize; x++) {
                cells[y][x] = new Cell(x, y);
                cells[y][x].setColor();
            }
        }

        // set timer for draw
        window.setInterval(draw, 100);
    }
}

function draw() {
    // iterate through all cells
    for (var y = 0; y < canvas.height/cellSize; y++) {
        for (var x = 0; x < canvas.width/cellSize; x++) {

            var neighbors = 0;
            // iterate through all neighbors
            if (x+1 < canvas.width/cellSize && y+1 < canvas.height/cellSize && cells[y+1][x+1].alive) {neighbors++}
            if (x+1 < canvas.width/cellSize                                 && cells[y+0][x+1].alive) {neighbors++}
            if (x+1 < canvas.width/cellSize && y-1 > 0                      && cells[y-1][x+1].alive) {neighbors++}
            if (                               y+1 < canvas.height/cellSize && cells[y+1][x+0].alive) {neighbors++}
            if (                               y-1 > 0                      && cells[y-1][x+0].alive) {neighbors++}
            if (x-1 > 0                     && y+1 < canvas.height/cellSize && cells[y+1][x-1].alive) {neighbors++}
            if (x-1 > 0                                                     && cells[y+0][x-1].alive) {neighbors++}
            if (x-1 > 0                     && y-1 > 0                      && cells[y-1][x-1].alive) {neighbors++}
            cells[y][x].neighbors = neighbors;
        }
    }

    for (var y = 0; y < canvas.height/cellSize; y++) {
        for (var x = 0; x < canvas.width/cellSize; x++) {
            cells[y][x].updateLife();
            cells[y][x].setColor();
        }
    }
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.alive = false;
    if (Math.random(0,1) <= probAlive) {
        this.alive = true;
    }

    this.setColor = function() {
        if (this.alive) {
            ctx.fillStyle = 'rgb(0, 255, 0)';
        } else {
            ctx.fillStyle = 'rgb(0, 0, 0)';
        }
        ctx.fillRect(this.x*cellSize, this.y*cellSize, cellSize, cellSize);
    }

    this.neighbors = 0;
    this.updateLife = function() {
        if (this.alive) {
            if (this.neighbors < 2 || this.neighbors > 3) {
                this.alive = false;
            }
        } else {
            if (this.neighbors == 3) {
                this.alive = true;
    }}}
}

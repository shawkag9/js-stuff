const cellSize = 2;
const probAlive = 0.08;

var canvas;
var ctx;

var cells;
var nextCells;

function setup() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        // instantiate array
        cells = new Array(canvas.height/cellSize);
        for (var x = 0; x < canvas.height/cellSize; x++) {
            cells[x] = new Array(canvas.width/cellSize);
        }
        nextCells = new Array(canvas.height/cellSize);
        for (var x = 0; x < canvas.height/cellSize; x++) {
            nextCells[x] = new Array(canvas.width/cellSize);
        }

        // generate cells
        for (var y = 0; y < canvas.height/cellSize; y++) {
            for (var x = 0; x < canvas.width/cellSize; x++) {
                if (Math.random() <= probAlive) {cells[y][x] = 1}
                else {cells[y][x] = 0}
            }
        }
        // set timer for draw
        window.setInterval(draw);
    }
}

function draw() {
    // iterate through all cells
    for (var y = 0; y < canvas.height/cellSize; y++) {
        for (var x = 0; x < canvas.width/cellSize; x++) {

            var neighbors = 0;
            if (x+1 < canvas.width/cellSize && y+1 < canvas.height/cellSize && cells[y+1][x+1] == 1) {neighbors++}
            if (x+1 < canvas.width/cellSize                                 && cells[y+0][x+1] == 1) {neighbors++}
            if (x+1 < canvas.width/cellSize && y-1 > 0                      && cells[y-1][x+1] == 1) {neighbors++}
            if (                               y+1 < canvas.height/cellSize && cells[y+1][x+0] == 1) {neighbors++}
            if (                               y-1 > 0                      && cells[y-1][x+0] == 1) {neighbors++}
            if (x-1 > 0                     && y+1 < canvas.height/cellSize && cells[y+1][x-1] == 1) {neighbors++}
            if (x-1 > 0                                                     && cells[y+0][x-1] == 1) {neighbors++}
            if (x-1 > 0                     && y-1 > 0                      && cells[y-1][x-1] == 1) {neighbors++}

            if      (cells[y][x] == 1 && neighbors > 3)     {nextCells[y][x] = 0}
            else if (cells[y][x] == 1 && neighbors < 2)     {nextCells[y][x] = 0}
            else if (cells[y][x] == 0 && neighbors == 3)    {nextCells[y][x] = 1}
            else                                            {nextCells[y][x] = cells[y][x]}
        }
    }

    for (var y = 0; y < canvas.height/cellSize; y++) {
        for (var x = 0; x < canvas.width/cellSize; x++) {
            if (nextCells[y][x] == 1) {
                ctx.fillStyle = 'rgb(0, 255, 0)';
            } else {
                ctx.fillStyle = 'rgb(0, 0, 0)';
            }
            ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
        }
    }

    var temp = cells;
    cells = nextCells;
    nextCells = temp;
}

function make2DArray(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var totalBees = 20;


function setup() {
    createCanvas(201, 201);
    rows = floor(width / w);
    cols = floor(height / w);
    grid = make2DArray(rows, cols);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //Pick totalBees spots
    var options = [];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < totalBees; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index,1);
        grid[i][j].bee = true;
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].countBees();
        }
    }
}

function gameOver() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].bee) {
                    gameOver();
                }
            }
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}
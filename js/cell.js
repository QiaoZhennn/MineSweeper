function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.bee = false;
    this.revealed = false;
}

Cell.prototype.show = function () {
    stroke(0);
    fill(255);
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee) {
            fill(127);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(127);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
            }
        }
    }
};

Cell.prototype.countBees = function () {
    if (this.bee) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
                var neighbor = grid[i][j];
                if (neighbor.bee) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
};


Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w
        && y > this.y && y < this.y + this.w);
};

Cell.prototype.reveal = function () {
    this.revealed = true;
    if (this.neighborCount == 0) {
        this.floodFill();
        //flood fill time
    }
};

Cell.prototype.floodFill = function () {
    this.revealed = true;
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
                var neighbor = grid[i][j];
                if (!neighbor.bee && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
};
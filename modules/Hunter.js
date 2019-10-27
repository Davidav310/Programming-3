var LiveForm = require("./LiveForm");
var random = require("./random");
var Meat = require('./Meat')

module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.kill = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    eat() {
        let emptyCells = this.chooseCell(3);
        let emptyCells1 = this.chooseCell(5);
        let finalCells = emptyCells.concat(emptyCells1);
        let newCell = random(finalCells);

        if (newCell) {
            this.kill++;

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i in foxArr) {
                if (foxArr[i].x == x && foxArr[i].y == y) {
                    foxArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

            if (this.kill >= 15) {
                this.die();
            }
        } else {
            this.move()
        }
    }
    move() {
        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let finalCells = emptyCells.concat(emptyCells1);
        let newCell = random(finalCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
    }
    die() {
        meatHashiv++;
        matrix[this.y][this.x] = 6;

        for (let i in hunterArr) {
            if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
                hunterArr.splice(i, 1)
            }
        }
        let meat = new Meat(this.x, this.y);
        meatArr.push(meat);
    }
}
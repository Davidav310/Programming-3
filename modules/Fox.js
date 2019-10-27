var LiveForm = require("./LiveForm");
var random = require("./random");
var Meat = require('./Meat')

module.exports = class Fox extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 40;
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
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;

            let fox = new Fox(x, y);
            foxArr.push(fox);

            this.life = 40;
            foxHashiv++;
        }
    }
    meat() {
        let emptyCells = this.chooseCell(6);
        let newCell = random(emptyCells);

        if (newCell) {
            this.life++;

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in meatArr) {
                if (meatArr[i].x == x && meatArr[i].y == y) {
                    meatArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

            if (this.life >= 42) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.life--;

        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let finalCells = emptyCells.concat(emptyCells1);
        let newCell = random(finalCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        meatHashiv++;
        matrix[this.y][this.x] = 6;

        for (let i in foxArr) {
            if (foxArr[i].x == this.x && foxArr[i].y == this.y) {
                foxArr.splice(i, 1)
            }
        }
        let meat = new Meat(this.x, this.y);
        meatArr.push(meat);
    }
}
class Meat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.time = 10;
    }
    move() {
        this.time--;
        if (this.time < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in meatArr) {
            if (meatArr[i].x == this.x && meatArr[i].y == this.y) {
                meatArr.splice(i, 1)
            }
        }
    }
}
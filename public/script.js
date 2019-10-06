let matrix = [];
let side = 20;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let hunterArr = [];
let foxArr = [];
let meatArr = [];

function setup() {
    matrixGenerator(40, 1200, 150, 50, 20, 50, 150);
    frameRate(4);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            if (matrix[y][x] == 4) {
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            }
            if (matrix[y][x] == 5) {
                let fox = new Fox(x, y);
                foxArr.push(fox);
            }
            if (matrix[y][x] == 6) {
                let meat = new Meat(x, y);
                meatArr.push(meat);
            }
        }
    }
    function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, fox) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = [];
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grass; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 1;
        }
        for (let i = 0; i < grassEater; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 2;
        }
        for (let i = 0; i < predator; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 3;
        }
        for (let i = 0; i < hunter; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 4;
        }
        for (let i = 0; i < fox; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 5;
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("#5b5b5b");
            }
            else if (matrix[y][x] == 4) {
                fill("#af7800");
            }
            else if (matrix[y][x] == 5) {
                fill("#ff7b00");
            }
            else if (matrix[y][x] == 6) {
                fill("#e54444");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].kill();
    }
    for (var i in hunterArr) {
        hunterArr[i].eat();
    }
    for (var i in foxArr) {
        foxArr[i].meat();
    }
    for (var i in meatArr) {
        meatArr[i].move();
    }
}

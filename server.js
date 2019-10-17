//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Hunter = require("./modules/Hunter.js");
var Fox = require("./modules/Fox.js");
let random = require('./modules/random');
//! Requiring modules  --  END

//! Initializing global arrays  --  START
grassArr = [];
grasseaterArr = [];
predatorArr = [];
hunterArr = [];
foxArr = [];
meatArr = [];
matrix = [];
//! Initializing global arrays  --  END

// statistics start
grassHashiv = 0;
grasseaterHashiv = 0;
predatorHashiv = 0;
hunterHashiv = 0;
foxHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grasseater, predator, hunter, fox) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fox; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 20, 15, 10, 2);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grasseaterArr.push(grassEater);
                grasseaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            }
            else if (matrix[y][x] == 4) {
                var hunter = new Hunter(x, y);
                hunterArr.push(hunter);
                hunterHashiv++
            }
            else if (matrix[y][x] == 5) {
                var fox = new Fox(x, y);
                foxArr.push(fox);
                foxHashiv++
            }
        }
    }
}


creatingObjects();

let exanak = 0;
let weather = "winter"

function game() {

    exanak++;
    if (exanak <= 10) {
        weather = "summer"
    }
    else if (exanak <= 20) {
        weather = "autumn"
    }
    else if (exanak <= 30) {
        exanak = "winter"
    }
    else if (exanak <= 40) {
        exanak = "spring"
    }
    else if (exanak > 40) {
        exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grasseaterArr[0] !== undefined) {
        for (var i in grasseaterArr) {
            grasseaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].kill();
        }
    }
    if (hunterArr[0] !== undefined) {
        for (var i in hunterArr) {
            hunterArr[i].eat();
        }
    }
    if (foxArr[0] !== undefined) {
        for (var i in foxArr) {
            foxArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grasseaterCounter: grasseaterHashiv,
        grasseaterLiveCounter: grasseaterArr.length,
        predatorCounter: predatorHashiv,
        predatorLiveCounter: predatorArr.length,
        hunterCounter: hunterHashiv,
        hunterLiveCounter: hunterArr.length,
        foxCounter: foxHashiv,
        foxLiveCounter: foxArr.length,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)
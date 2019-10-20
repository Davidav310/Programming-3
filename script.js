function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');

    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');

    let predatorCountElement = document.getElementById('predatorCount');
    let predatorLiveCountElement = document.getElementById('predatorLiveCount');

    let hunterCountElement = document.getElementById('hunterCount');
    let hunterLiveCountElement = document.getElementById('hunterLiveCount');

    let foxCountElement = document.getElementById('foxCount');
    let foxLiveCountElement = document.getElementById('foxLiveCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        // let sendData = {
        //     matrix: matrix,
        //     grassCounter: grassHashiv,
        //     grassLiveCounter: grassArr.length,
        //     eatCounter: eatHashiv,
        //     huntCounter: huntHashiv,
        //     termCounter: termHashiv,
        //     titanCounter: titanHashiv,
        //     weather: weather
        // }

        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.grasseaterCounter;
        grassEaterLiveCountElement.innerText = data.grasseaterLiveCounter;
        predatorCountElement.innerText = data.predatorCounter;
        predatorLiveCountElement.innerText = data.predatorLiveCounter;
        hunterCountElement.innerText = data.hunterCounter;
        hunterLiveCountElement.innerText = data.hunterLiveCounter;
        foxCountElement.innerText = data.foxCounter;
        foxLiveCountElement.innerText = data.foxLiveCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "summer") {
                        fill("green");
                    }
                    else if (data.weather == "autumn") {
                        fill("orange");
                    }
                    else if (data.weather == "winter") {
                        fill("#c2f1f2");
                    }
                    else if (data.weather == "spring") {
                        fill("green");
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 3) {
                    fill('#5b5b5b');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 4) {
                    fill('#af7800');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 5) {
                    if(data.weather == "winter"){
                        fill('#e3faf9');
                    }
                    else{
                        fill('#ff7b00');
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 6) {
                    fill('#e54444');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
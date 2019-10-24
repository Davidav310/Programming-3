function setup() {
    var socket = io();
    var side = 20;
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
                if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 1) {
                    if (data.weather == "summer") {
                        fill("green");
                    }
                    else if (data.weather == "autumn") {
                        fill("#de4e00");
                    }
                    else if (data.weather == "winter") {
                        fill("#c2f1f2");
                    }
                    else if (data.weather == "spring") {
                        fill("#29e61c");
                    }
                    else{
                        fill("green");
                    }
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 2) {
                    if (data.weather == "summer") {
                        fill("yellow");
                    }
                    else if (data.weather == "autumn") {
                        fill("#e6e21e");
                    }
                    else if (data.weather == "winter") {
                        fill("#e8e543");
                    }
                    else if (data.weather == "spring") {
                        fill("#e6e365");
                    }
                    else{
                        fill("yellow");
                    }
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 3) {
                    if (data.weather == "summer") {
                        fill("#5b5b5b");
                    }
                    else if (data.weather == "autumn") {
                        fill("#696868");
                    }
                    else if (data.weather == "winter") {
                        fill("#807e7e");
                    }
                    else if (data.weather == "spring") {
                        fill("#6b6b6b");
                    }
                    else{
                        fill("#5b5b5b");
                    }
                    rect(j * side, i * side, side, side);
                }

                else if (matrix[i][j] == 4) {
                    if (data.weather == "summer") {
                        fill("#af7800");
                    }
                    else if (data.weather == "autumn") {
                        fill("#9c6b00");
                    }
                    else if (data.weather == "winter") {
                        fill("#a38b56");
                    }
                    else if (data.weather == "spring") {
                        fill("#996900");
                    }
                    else{
                        fill("#af7800");
                    }
                    rect(j * side, i * side, side, side);
                }
                
                else if (matrix[i][j] == 5) {
                    if (data.weather == "summer") {
                        fill("#ff7b00");
                    }
                    else if (data.weather == "autumn") {
                        fill("#ff8614");
                    }
                    else if (data.weather == "winter") {
                        fill("#ffab5c");
                    }
                    else if (data.weather == "spring") {
                        fill("#de6c00");
                    }
                    else{
                        fill("#ff7b00");
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
let global = {
    currentLevel: 0,
    grayTilesleft: 0,
};


function activate(xPos, yPos) {
    button = document.getElementById(`${xPos}, ${yPos}`);
    levels[`level${global.currentLevel}`].tileMap[xPos][yPos].interact();
    levels[`level${global.currentLevel}`].display(false);
    levels[`level${global.currentLevel}`].checkWinStates();
    setTimeout(function () {
        button.blur();
    }, 250);
}

function spawnNext() {
    levels[`level${global.currentLevel + 1}`].display()
}

function replay() {
    levels[`level${global.currentLevel}`].display()
}
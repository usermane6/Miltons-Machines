let global = {
    currentLevel: 0,
    grayTilesleft: 0,
    turnsLeft: 0,
    isCurrentNoteSeen: false,
};

const colors = {
    black: "rgb(28, 28, 28)",
    gray: "rgb(133, 133, 133)",
    white: "rgb(245, 237, 237)",
    red: "rgb(255, 51, 0)",
    brown: "rgb(150, 71, 11)",
};

const notes = [1, 9];

function activate(xPos, yPos) {
    const button = document.getElementById(`${xPos}, ${yPos}`);
    setTimeout(function () {
        button.blur();
    }, 250);
    if (global.turnsLeft > 0) {
        global.turnsLeft -= 1;
        levels[`level${global.currentLevel}`].tileMap[xPos][yPos].interact();
        levels[`level${global.currentLevel}`].display(false);
        levels[`level${global.currentLevel}`].checkWinStates();
    }
}

function spawnNext() {
    const game = document.getElementById("game"),
        note = document.getElementById("note");
    if (notes.includes(global.currentLevel + 1) && global.isCurrentNoteSeen == false) {
        displayNote(global.currentLevel + 1);
    } else if (Object.keys(levels).length != global.currentLevel) {
        game.style.display = "block";
        note.style.display = "none";
        levels[`level${global.currentLevel + 1}`].display();
        global.isCurrentNoteSeen = false
    }
}

function replay() {
    levels[`level${global.currentLevel}`].display();
}

function displayNote(imgNum) {
    const game = document.getElementById("game"),
        note = document.getElementById("note");
        image = document.getElementById("note-img")
    note.style.display = "block";
    game.style.display = "none";
    image.setAttribute("src", `images/note${imgNum}.png`)
    global.isCurrentNoteSeen = true
}

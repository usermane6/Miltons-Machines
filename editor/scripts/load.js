let height, width;

function load() {
    height = document.getElementById("height").value;
    width = document.getElementById("width").value;

    const container = document.getElementById("tileMap");
    container.innerHTML = "";

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            const newTile = document.createElement("button");

            newTile.setAttribute("id", `${i}, ${j}`);
            newTile.setAttribute("class", `tile${i + 1} tileBase`);
            newTile.setAttribute("onclick", `editButton(${i}, ${j})`);

            container.appendChild(newTile);
        }
    }
}

function editButton(x, y) {
    document.getElementById(`${x}, ${y}`).style.backgroundColor = document.getElementById(
        "tileType"
    ).value;

    document.getElementById(`${x}, ${y}`).innerHTML = document.getElementById("tileType").value
}

function print() {
    let level = [];
    let levelString = "[";

    for (var i = 0; i < height; i++) {
        level.push([]);

        for (var j = 0; j < width; j++) {
            let data = document.getElementById(`${i}, ${j}`).innerHTML;
            level[i].push(`\"${data}\"`);
        }

        levelString = levelString + `[${level[i].toString()}],`;
    }

    levelString = levelString.substring(0, levelString.length - 1) + "]";
    document.getElementById("output").innerHTML = levelString;
}

function fill() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            editButton(i, j)            
        }
    }
}
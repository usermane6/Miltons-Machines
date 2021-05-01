class level {
    constructor(tileMap, lvlNum) {
        this.tileMap = [];
        this.realTileMap = tileMap;
        this.lvlNum = lvlNum;
        this.isInterpreted = false;
    }

    interpret() {
        let classTemplate, currentTile, currentSecondary;

        this.tileMap = [];
        for (var i = 0; i < this.realTileMap.length; i++) {
            this.tileMap.push([]);
            for (var j = 0; j < this.realTileMap[i].length; j++) {
                currentSecondary = "";
                console.log(typeof this.realTileMap[i][j]);
                if (typeof this.realTileMap[i][j] == "string") {
                    currentTile = this.realTileMap[i][j];
                } else {
                    (currentTile = this.realTileMap[i][j][0]),
                        (currentSecondary = this.realTileMap[i][j][1]);
                }

                classTemplate = currentSecondary
                    ? (classTemplate = `new ${currentTile}Tile(${i}, ${j}, "${currentSecondary}")`)
                    : (classTemplate = `new ${currentTile}Tile(${i}, ${j})`);

                classTemplate = eval(classTemplate);
                this.tileMap[i].push(classTemplate);
            }
        }
        this.isInterpreted = true;
    }

    display(isInitialSpawn = true) {
        document.getElementById("continue").disabled = true;

        if (isInitialSpawn) {
            this.interpret();
        }
        (global.grayTilesleft = 0), (global.currentLevel = this.lvlNum);

        const container = document.getElementById("container");
        container.innerHTML = "";
        for (var i = 0; i < this.tileMap.length; i++) {
            for (var j = 0; j < this.tileMap[i].length; j++) {
                const newTile = document.createElement("button");

                newTile.setAttribute("id", `${i}, ${j}`);
                newTile.setAttribute("class", `tile${i + 1}`);
                newTile.setAttribute("onclick", `activate(${i}, ${j})`);

                newTile.style.backgroundColor = this.tileMap[i][j].id;

                container.appendChild(newTile);

                if (this.tileMap[i][j].id != this.tileMap[i][j].secondary) {
                    const newSecondary = document.createElement("div") 

                    newSecondary.setAttribute("id", `${i}, ${j}, secondary`)
                    newSecondary.setAttribute("class", "secondary")

                    newSecondary.style.backgroundColor = this.tileMap[i][j].secondary;

                    newTile.appendChild(newSecondary)
                }
            }
        }
    }

    checkWinStates() {
        global.grayTilesleft = 0;
        for (let i = 0; i < this.tileMap.length; i++) {
            for (let j = 0; j < this.tileMap[i].length; j++) {
                if (this.tileMap[i][j].id == "gray") {
                    global.grayTilesleft++;
                }
            }
        }

        if (global.grayTilesleft == 0) {
            document.getElementById("continue").disabled = false;
        }
    }
}

class tile {
    constructor(xPos, yPos, secondary) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.secondary = secondary;
    }

    interact() {}
}

class blackTile extends tile {
    constructor(xPos, yPos, secondary) {
        super(xPos, yPos, secondary);
        this.id = "black";
    }
}

class grayTile extends tile {
    constructor(xPos, yPos, secondary) {
        super(xPos, yPos, secondary);
        this.id = "gray";
        this.effectiveType = "gray";
    }
}

class brownTile extends tile {
    constructor(xPos, yPos, secondary) {
        super(xPos, yPos, secondary);
        this.id = "brown";
        this.effectiveType = "gray";
    }
}

class whiteTile extends tile {
    constructor(xPos, yPos, secondary = "white") {
        super(xPos, yPos, secondary);
        this.id = "white";
    }

    interact() {
        let currentLevel = levels[`level${global.currentLevel}`];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                check(i, j, this);
            }
        }

        function check(xMod, yMod, tile) {
            if (
                xMod == yMod ||
                xMod + yMod == 0 ||
                xMod + yMod == -2 ||
                xMod + yMod == 2
            ) {
                return;
            }
            for (let i = 1; i < currentLevel.tileMap[0].length; i++) {
                if (
                    tile.xPos + xMod * i < 0 ||
                    tile.xPos + xMod * i >= currentLevel.tileMap.length
                ) {
                    break;
                }
                if (
                    tile.yPos + yMod * i < 0 ||
                    tile.yPos + yMod * i >= currentLevel.tileMap[0].length
                ) {
                    break;
                }
                console.log(tile.yPos + yMod + i, tile.xPos + xMod * i);
                if (
                    currentLevel.tileMap[tile.xPos + xMod * i][
                        tile.yPos + yMod * i
                    ].effectiveType != "gray"
                ) {
                    break;
                }
                currentLevel.tileMap[tile.xPos + xMod * i][
                    tile.yPos + yMod * i
                ] = eval(
                    `new ${tile.secondary}Tile(${tile.xPos + xMod * i}, ${
                        tile.yPos + yMod * i
                    })`
                );
            }
        }
    }
}

class redTile extends tile {
    constructor(xPos, yPos, secondary = "brown") {
        super(xPos, yPos, secondary);
        this.id = "red";
    }

    interact() {
        let currentLevel = levels[`level${global.currentLevel}`];

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                currentLevel.tileMap[this.xPos + i][this.yPos + j] = eval(
                    `new ${this.secondary}Tile(${i}, ${j})`
                );
            }
        }
    }
}

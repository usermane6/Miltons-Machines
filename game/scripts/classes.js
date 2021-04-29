let global = {
    currentLevel: 0,
    grayTilesleft: 0,
};

class level {
    constructor(tileMap, lvlNum) {
        this.tileMap = [];
        this.realTileMap = tileMap;
        this.lvlNum = lvlNum;
        this.isInterpreted = false;
    }

    interpret() {
        console.log(this.realTileMap)
        let classTemplate, currentTile;
        this.tileMap = [];
        for (var i = 0; i < this.realTileMap.length; i++) {
            this.tileMap.push([])
            for (var j = 0; j < this.realTileMap[i].length; j++) {
                currentTile = this.realTileMap[i][j];
                if (currentTile != "") {
                    classTemplate = `new ${currentTile}Tile(${i}, ${j})`;
                    
                    classTemplate = eval(classTemplate);
                    this.tileMap[i].push(classTemplate);
                } else {
                    this.tileMap[i][j] = new blackTile(i, j);
                }
            }
            //this.tileMap.push(this.tileMap[i])
        }
        console.log(this.tileMap);
        this.isInterpreted = true;
    }

    display(isInitialSpawn = true) {
        if(isInitialSpawn) {this.interpret();}
        (global.grayTilesleft = 0), (global.currentLevel = this.lvlNum);

        const container = document.getElementById("container");
        container.innerHTML = "";
        for (var i = 0; i < this.tileMap.length; i++) {
            for (var j = 0; j < this.tileMap[i].length; j++) {
                const newTile = document.createElement("button");

                newTile.setAttribute("id", `${i}, ${j}`);
                newTile.setAttribute("class", `tile${i + 1} tileBase`);
                newTile.setAttribute("onclick", `activate(${i}, ${j})`);

                newTile.style.backgroundColor = this.tileMap[i][j].id;

                container.appendChild(newTile);
            }
        }
    }

    checkWinStates() {
        for (let i = 0; i < this.tileMap.length; i++) {
            this.tileMap[i].includes(grayTile);
        }
    }
}

class tile {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    display() {
        displayTile = document.getElementById(`${this.xPos}, ${this.yPos}`);
        displayTile.className = "";
        displayTile.style.backgroundColor = this.id;
        displayTile.setAttribute("class", `tile${this.xPos + 1} tileBase`);
    }

    interact() {}
}

class blackTile extends tile {
    constructor(xPos, yPos) {
        super(xPos, yPos);
        this.id = "black";
    }
}

class grayTile extends tile {
    constructor(xPos, yPos) {
        super(xPos, yPos);
        this.id = "gray";
    }
}

class whiteTile extends tile {
    constructor(xPos, yPos) {
        super(xPos, yPos);
        this.id = "white";
    }

    interact() {
        let currentLevel = levels[`level${global.currentLevel}`];

        for (let i = 0; i < currentLevel.tileMap[0].length; i++) {
            if (currentLevel.tileMap[this.xPos][this.yPos + i].id != "gray") {
                break;
            }
            currentLevel.tileMap[this.xPos][this.yPos + i] = new whiteTile(
                this.xPos,
                this.yPos + i
            );
        }

        for (let i = 1; i < currentLevel.tileMap[0].length; i++) {
            if (currentLevel.tileMap[this.xPos][this.yPos - i].id != "gray") {
                break;
            }
            currentLevel.tileMap[this.xPos][this.yPos - i] = new whiteTile(
                this.xPos,
                this.yPos - i
            );
        }

        for (let i = 1; i < currentLevel.tileMap.length; i++) {
            if (currentLevel.tileMap[this.xPos + i][this.yPos].id != "gray") {
                break;
            }
            currentLevel.tileMap[this.xPos + i][this.yPos] = new whiteTile(
                this.xPos + i,
                this.yPos
            );
        }

        for (let i = 1; i < currentLevel.tileMap.length; i++) {
            if (currentLevel.tileMap[this.xPos - i][this.yPos].id != "gray") {
                break;
            }
            currentLevel.tileMap[this.xPos - i][this.yPos] = new whiteTile(
                this.xPos - i,
                this.yPos
            );
        }
    }
}

function activate(xPos, yPos) {
    button = document.getElementById(`${xPos}, ${yPos}`);
    levels[`level${global.currentLevel}`].tileMap[xPos][yPos].interact();
    levels[`level${global.currentLevel}`].display(false);
    setTimeout(function () {
        button.blur();
    }, 250);
}

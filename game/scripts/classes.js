class level {
    constructor(tileMap) {
        this.tileMap = tileMap;
    }

    interpret() {
        let valueStorage = {}, currentTile;

        for (var i = 0; i < this.tileMap.length; i++) {
            for (var j = 0; j < this.tileMap[i].length; j++) {
                currentTile = this.tileMap[i][j]
                if (currentTile != "") {
                    valueStorage = `{stored: new ${currentTile}(${i}, ${j})}`
                    valueStorage = JSON.parse(valueStorage)
                    tileMap[i][j] = valueStorage.stored
                } else {
                    this.tileMap[i][j] = new blackTile(i, j)
                }
            }
        }
    }

    display() {
        const container = document.getElementById("container")
        container.innerHTML = ""
        for (var i = 0; i < this.tileMap.length; i++) {
            for (var j = 0; j < this.tileMap[i].length; j++) {
            
                const newTile = document.createElement("button");

                newTile.setAttribute("id", `${i}, ${j}`);
                newTile.setAttribute("class", `tile${i + 1} tileBase`);
                newTile.setAttribute("onclick", `editButton(${i}, ${j})`);

                container.appendChild(newTile);
            }
        }
    }
}

class tile {
    constructor(xPos, yPos) {
        this.position = [xPos, yPos];
    }

    display() {
        displayTile = document.getElementById(
            `${this.position[0]}, ${this.position[1]}`
        );
        displayTile.className = "";
        displayTile.style.color = this.id;
    }
}

class blackTile extends tile {
    constructor(xPos, yPos) {
        super(xPos, yPos);
        this.id = "black";
    }
}

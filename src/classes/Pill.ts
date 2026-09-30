import tab from "../data/Boardstate";
import newPillFrames from "../data/Frames";
import objids from "../data/Cellids";
import obj from "../data/Pillid"

/**
 * @interfaces
 *
 * statics - constant values shared by every pill instance
 *
 */
interface statics {
    readonly directions: Array<string>
}

/**
 * @class
 *
 * Represents the pill currently falling under the player's control:
 * its position, orientation, and colors, plus the logic for moving,
 * rotating, and locking it into the board, matching runs of 4+ same
 * colored cells, and dropping anything left floating afterward.
 */

class Tabletka implements statics {
    tab: HTMLTableElement
    posX = 3;
    posY = 1;
    directions = ["RL", "DT", "LR", "TD"];
    direct = this.directions[0];
    directn = 0;
    sides: Array<HTMLTableCellElement> = []
    c1 = Math.round(Math.random() * 2)
    c2 = Math.round(Math.random() * 2)
    lock = false;
    lock2 = false;
    inter: any;

    colors = ["red", "blue", "yellow"]
    constructor() {
        this.tab = document.getElementById("plansza") as HTMLTableElement
    }

    /**
     * @param colors
     * The pill's two colors, as color indexes (see `colors`)
     *
     * @method create
     * Renders the pill at its current position and orientation, and
     * remembers the two cells it's currently occupying in `sides`.
     */

    create(colors: Array<number>) {
        let td1 = document.getElementById("a-" + newPillFrames[newPillFrames.length - 1].y1 + "," + newPillFrames[newPillFrames.length - 1].x1) as HTMLTableCellElement
        let td2 = document.getElementById("a-" + newPillFrames[newPillFrames.length - 1].y2 + "," + newPillFrames[newPillFrames.length - 1].x2) as HTMLTableCellElement
        td1.style.backgroundImage = "";
        td2.style.backgroundImage = "";
        let side;
        for (let i = 0; i < 2; i++) {
            let x = this.posX;
            let y = this.posY;
            switch (this.direct) {
                case "RL":
                    x += i;
                    break;
                case "DT":
                    y += i;
                    break;
                case "LR":
                    x -= i;
                    break;
                case "TD":
                    y -= i;
                    break;

                default:
                    break;
            }
            side = document.getElementById(y + "," + x) as HTMLTableCellElement;
            side.style.backgroundImage = "url('src/img/" + this.colors[colors[i]] + ".png')";
            this.sides[i] = side;

        }
    }

    /**
     *
     * @param pos
     * The cell to clear, as a "row,col" id
     *
     * @method clear
     * Clears a cell's background image.
     */

    clear(pos: string) {
        let clear_td = document.getElementById(pos) as HTMLTableCellElement;
        clear_td.style.backgroundImage = "";
    }

    /**
     *
     * @param pos
     * The cell being popped, as a "row,col" id
     * @param c
     * The color letter ("r"/"b"/"y") of the popped cell
     * @param v
     * Whether the popped cell was a virus
     *
     * @method pop
     * Plays the little "pop" animation for a single cleared cell, once
     * it's been matched.
     */
    pop(pos: any, c: string, v: boolean) {
        let clear_td = document.getElementById(pos) as HTMLTableCellElement;
        pos = pos.split(",")
        console.log(tab[parseInt(pos[0])][parseInt(pos[1])]);

        if (v) {
            clear_td.style.backgroundImage = "url('src/img/" + c + "_x.png')";
        }
        else {
            clear_td.style.backgroundImage = "url('src/img/" + c + "_o.png')";
        }

        // setTimeout(() => {
        //     this.clear(pos)
        // }, 100);
    }

    /**
     * @method move
     *
     * Ticks the pill one cell further in its fall direction every
     * second, as long as it isn't locked. Once it reaches the bottom
     * row or the cell below it is occupied, it locks into the board,
     * checks both halves for matches, and triggers any resulting fall.
     */

    move() {
        this.inter = setInterval(() => {
            if (!this.lock) {
                let x = this.posX;
                let y = this.posY;

                switch (this.direct) {
                    case "RL":
                        x += 1;
                        break;
                    case "DT":
                        y += 1;
                        break;
                    case "LR":
                        x -= 1;
                        break;
                    case "TD":
                        y -= 1;
                        break;
                    default:
                        break;
                }
                if (tab[this.posY + 1][this.posX] == "0" && tab[y + 1][x] == "0") {
                    this.clear(this.posY + "," + this.posX)
                    this.clear(y + "," + x)
                    this.posY++;
                    y++;
                    this.create([this.c1, this.c2]);
                }


                if (this.posY == 15 || (this.direct == "DT" && y == 15) || tab[this.posY + 1][this.posX] != "0" || tab[y + 1][x] != "0") {
                    clearInterval(this.inter)
                    this.lock = true

                    tab[this.posY][this.posX] = this.colors[this.c1][0]
                    tab[y][x] = this.colors[this.c2][0]
                    objids.ids[this.posY][this.posX] = obj.idn.toString()
                    objids.ids[y][x] = obj.idn.toString()
                    this.check(this.posX, this.posY, this.colors[this.c1][0])
                    this.check(x, y, this.colors[this.c2][0])
                    this.fall()
                }
            }
        }, 1000);
    }

    /**
     * @method fall
     * After a match has been cleared, finds every pill half left
     * floating over an empty cell (including halves whose other half
     * already fell away and is now a lone piece) and drops each of
     * them down, one row at a time, until they land - then re-checks
     * for any new matches and re-runs itself in case that causes
     * further pieces to fall.
     */

    fall() {
        console.log("aaaaa");

        let fallInter: any;
        let toFall: any = []
        let toFallids: any = []
        for (let i = 14; i >= 0; i--) {
            for (let j = 0; j <= 7; j++) {
                let ids = objids.getIds()
                if (!tab[i][j].includes("v")) {
                    if (tab[i][j] != "0" && tab[i][j + 1] != "0" && ids[i][j] == ids[i][j + 1] && tab[i + 1][j] == "0" && tab[i + 1][j + 1] == "0") {
                        if (!toFallids.includes(i + "," + j)) {
                            toFallids.push(i + "," + j)
                            toFall.push([i, j, ids[i][j], "p"])
                        }
                        if (!toFallids.includes(i + "," + (j + 1))) {
                            toFallids.push(i + "," + (j + 1))
                            toFall.push([i, j + 1, ids[i][j], "l"])
                        }
                    }
                    else if (tab[i][j] != "0" && tab[i][j - 1] != "0" && ids[i][j] == ids[i][j - 1] && tab[i + 1][j] == "0" && tab[i + 1][j - 1] == "0") {
                        if (!toFallids.includes(i + "," + j)) {
                            toFallids.push(i + "," + j)
                            toFall.push([i, j, ids[i][j], "l"])
                        }
                        if (!toFallids.includes(i + "," + (j - 1))) {
                            toFallids.push(i + "," + (j - 1))
                            toFall.push([i, j - 1, ids[i][j], "p"])
                        }
                    }
                    else if (tab[i][j] != "0" && tab[i + 1][j] == "0" && (ids[i][j] != ids[i][j + 1] && ids[i][j] != ids[i][j - 1])) {
                        toFall.push([i, j])
                    }
                }
            }
        }

        let elements = 0;


        if (toFall.length != 0) {
            toFall.forEach(element => {
                let cl = tab[element[0]][element[1]]
                fallInter = setInterval(() => {
                    if (element[0] + 1 <= 15 && tab[element[0] + 1][element[1]] == "0") {
                        tab[element[0]][element[1]] = "0";
                        this.clear(element[0] + "," + element[1])
                        this.clear(element[0] + "," + element[1])
                        tab[element[0] + 1][element[1]] = cl
                        let ids = objids.getIds()
                        let idp = ids[element[0]][element[1]]
                        objids.ids[element[0]][element[1]] = "0"
                        objids.ids[element[0] + 1][element[1]] = idp

                        element[0]++;
                        let td = document.getElementById(element[0] + "," + element[1]) as HTMLTableCellElement
                        let cln = 0;
                        switch (cl) {
                            case "r":
                                cln = 0;
                                break;
                            case "b":
                                cln = 1;
                                break;
                            case "y":
                                cln = 2;
                                break;
                        }
                        td.style.backgroundImage = "url('src/img/" + this.colors[cln] + ".png')";
                    }

                    if (element[0] == 15 || tab[element[0] + 1][element[1]] != "0") {
                        elements++;
                        if (elements == toFall.length) {
                            this.fall()
                        }
                        this.check(element[1], element[0], cl)
                        clearInterval(fallInter)
                    }

                }, 100);
            });
        }
        else {
            this.lock2 = true
        }
    }

    /**
     *
     * @param x
     * Column of the cell that was just placed/locked
     * @param y
     * Row of the cell that was just placed/locked
     * @param c
     * The cell's color letter ("r"/"b"/"y")
     *
     * @method check
     * Starting from the given cell, scans outward in all 4 directions
     * (up/down/left/right) for a run of 4 or more same-colored cells
     * (matching both pill halves and viruses). If a run of 4+ is found,
     * clears it, pops any viruses it contained, and awards points for
     * them.
     *
     */

    check(x: number, y: number, c: string) {
        clearInterval(this.inter)
        let next = true
        let up = y;
        let down = y;
        let left = x;
        let right = x;
        let vis = 0;

        let posTD: any = []
        let posRL: any = []
        while (next) {
            next = false
            if (up >= 0 && (tab[up][x] == c || tab[up][x] == "v" + c) && !posTD.includes(up + "," + x)) {
                posTD.push(up + "," + x)
                next = true
                if (tab[up][x] == "v" + c) {
                    vis++
                }
            }
            else if (up >= 0 && tab[up][x] != c && tab[up][x] != "v" + c) {
                up = -1
            }

            if (down <= 15 && (tab[down][x] == c || tab[down][x] == "v" + c) && !posTD.includes(down + "," + x)) {
                posTD.push(down + "," + x)
                next = true
                if (tab[down][x] == "v" + c) {
                    vis++
                }
            }
            else if (down <= 15 && tab[down][x] != c && tab[down][x] != "v" + c) {
                down = 16
            }

            if (left >= 0 && (tab[y][left] == c || tab[y][left] == "v" + c) && !posRL.includes(y + "," + left)) {
                posRL.push(y + "," + left)
                next = true
                if (tab[y][left] == "v" + c) {
                    vis++
                }
            }
            else if (left >= 0 && tab[y][left] != c && tab[y][left] != "v" + c) {
                left = -1
            }

            if (right <= 7 && (tab[y][right] == c || tab[y][right] == "v" + c) && !posRL.includes(y + "," + right)) {
                posRL.push(y + "," + right)
                next = true
                if (tab[y][right] == "v" + c) {
                    vis++
                }
            }
            else if (right <= 7 && tab[y][right] != c && tab[y][right] != "v" + c) {
                right = 8
            }
            down++;
            up--;
            left--;
            right++;
        }
        let pos = [posTD, posRL]
        pos.forEach(element => {
            if (element.length >= 4 && !next) {
                if (vis > 0) {
                    let virs: any = localStorage.getItem("viruses")
                    virs = parseInt(virs)
                    virs -= vis;
                    localStorage.setItem("viruses", virs.toString())
                    let sc: any = localStorage.getItem("score")
                    sc = parseInt(sc)
                    sc += vis * 100
                    localStorage.setItem("score", sc.toString())
                }

                for (let i = 0; i < element.length; i++) {
                    let v = false;
                    if (tab[element[i].split(",")[0]][element[i].split(",")[1]].includes("v")) {
                        v = true;
                    }
                    tab[element[i].split(",")[0]][element[i].split(",")[1]] = "0"
                    objids.ids[element[i].split(",")[0]][element[i].split(",")[1]] = "0"
                    setTimeout(() => {
                        this.pop(element[i], c, v)
                        setTimeout(() => {
                            this.clear(element[i])
                        }, 100);
                    }, 100);
                }
            }
        });

    }

    /**
     *
     * @param x
     * Column of the pill's second half
     * @param y
     * Row of the pill's second half
     *
     * @method down
     * The hard-drop variant of `move()`, triggered by the down-arrow
     * key: repeatedly steps the pill downward every 100ms (instead of
     * every second) until it lands, then locks it in and runs the same
     * match-checking and falling logic as a normal landing.
     */

    down(x: number, y: number) {
        clearInterval(this.inter)
        let dinter = setInterval(() => {
            this.lock = true
            this.clear(y + "," + x)
            this.clear(this.posY + "," + this.posX)
            this.posY++;
            y++;

            if (this.posY == 15 || (this.direct == "DT" && y == 15) || tab[this.posY + 1][this.posX] != "0" || tab[y + 1][x] != "0") {
                this.lock = true

                tab[this.posY][this.posX] = this.colors[this.c1][0]
                tab[y][x] = this.colors[this.c2][0]
                objids.ids[this.posY][this.posX] = obj.idn.toString()
                objids.ids[y][x] = obj.idn.toString()
                this.check(this.posX, this.posY, this.colors[this.c1][0])
                this.check(x, y, this.colors[this.c2][0])
                this.fall()
                clearInterval(dinter)
            }
            this.create([this.c1, this.c2])

        }, 100);

    }

    /**
     * @method controls
     *
     * Wires up the keyboard controls: left/right arrows move the pill
     * sideways, up arrow (or shift) rotates it, and down arrow hard-drops it.
     */

    controls() {
        document.addEventListener("keydown", (e) => {
            if (!this.lock) {
                let x = this.posX;
                let y = this.posY;

                switch (this.direct) {
                    case "RL":
                        x += 1;
                        break;
                    case "DT":
                        y += 1;
                        break;
                    case "LR":
                        x -= 1;
                        break;
                    case "TD":
                        y -= 1;
                        break;
                    default:
                        break;
                }

                this.clear(this.posY + "," + this.posX)
                this.clear(y + "," + x)

                switch (e.key) {
                    case "ArrowLeft":
                        if ((x != 0 && this.posX != 0) && (tab[this.posY][this.posX - 1] == "0" && tab[y][x - 1] == "0")) {
                            this.posX--;
                        }
                        break;
                    case "ArrowRight":
                        if ((x != 7 && this.posX != 7) && (tab[this.posY][this.posX + 1] == "0" && tab[y][x + 1] == "0")) {
                            this.posX++;
                        }
                        break;
                    case "ArrowUp":
                        if ((this.posX != 7 && this.direct != "TD" && tab[this.posY][this.posX + 1] == "0" && tab[y][x + 1] == "0") || (this.posX != 0 && this.direct != "DT" && tab[this.posY][this.posX - 1] == "0" && tab[y][x - 1] == "0")) {
                            this.directn--;
                            if (this.directn == -1) {
                                this.directn = 3
                            }
                        }
                        break;
                    case "Shift":
                        if ((this.posX != 7 && this.direct != "DT" && tab[this.posY][this.posX + 1] == "0" && tab[y][x + 1] == "0") || (this.posX != 0 && this.direct != "TD" && tab[this.posY][this.posX - 1] == "0" && tab[y][x - 1] == "0")) {
                            this.directn++;
                            if (this.directn == 4) {
                                this.directn = 0
                            }
                        }
                        break;
                    case "ArrowDown":
                        this.lock = true;
                        this.down(x, y)
                        break;
                }
                this.direct = this.directions[this.directn]
                this.create([this.c1, this.c2])
            }
        })
    }
}

export default Tabletka
import newPillFrames from '../data/Frames.ts'


/**
 * @class Arm
 *
 * Animates Dr. Mario's hand lowering a freshly-generated pill into the
 * drop zone at the top of the board, at the start of every turn.
 */

class Arm {
    div: HTMLDivElement
    table: HTMLTableElement
    colors = ["red", "blue", "yellow"]
    constructor(div: HTMLDivElement) {
        this.div = div;
        this.table = document.createElement("table")
        this.table.id = "reka"
        this.div.appendChild(this.table)
        this.create(this.table)
    }

    /**
     * @method create
     *
     * Builds the 8x12 grid used to render the hand and the incoming
     * pill above the main board.
     *
     * @param tab
     * The HTML element the grid should be attached to
     */

    create(tab: HTMLElement) {
        for (let i = 0; i < 8; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 12; j++) {
                let td = document.createElement("td");
                td.style.border = "none"
                td.id = "a-" + i + "," + j;
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
    }

    /**
     *
     * @param c1
     * Color index of the pill's first half
     * @param c2
     * Color index of the pill's second half
     * @param lek
     * The Tabletka (pill) instance being delivered - once the hand
     * animation finishes, control is handed over to it
     *
     * @method goAnim
     * Plays through data/Frames.ts frame by frame, redrawing the hand
     * and the pill it's carrying at each step, then starts the pill
     * moving and enables its keyboard controls once the hand animation
     * completes.
     */

    goAnim(c1: number, c2: number, lek: any) {
        let i = 0
        let td1 = document.getElementById("a-" + newPillFrames[i].y1 + "," + newPillFrames[i].x1) as HTMLTableCellElement
        let td2 = document.getElementById("a-" + newPillFrames[i].y2 + "," + newPillFrames[i].x2) as HTMLTableCellElement
        let clear_td = document.getElementById("a-7,11") as HTMLTableCellElement
        clear_td.style.backgroundImage = ""
        let armtd1 = document.getElementById("a-" + newPillFrames[i].arm.y1 + "," + newPillFrames[i].arm.x1) as HTMLTableCellElement
        let armtd2 = document.getElementById("a-" + newPillFrames[i].arm.y2 + "," + newPillFrames[i].arm.x2) as HTMLTableCellElement
        let armtd3: HTMLTableCellElement;
        let armtd4: HTMLTableCellElement;
        if (typeof (newPillFrames[i].arm.y3) != "undefined") {
            armtd3 = document.getElementById("a-" + newPillFrames[i].arm.y3 + "," + newPillFrames[i].arm.x3) as HTMLTableCellElement
        }
        if (typeof (newPillFrames[i].arm.y4) != "undefined") {
            armtd4 = document.getElementById("a-" + newPillFrames[i].arm.y4 + "," + newPillFrames[i].arm.x4) as HTMLTableCellElement
        }
        let pillInterval = setInterval(() => {

            td1.style.backgroundImage = ""
            td2.style.backgroundImage = ""
            armtd1.style.backgroundImage = ""
            armtd2.style.backgroundImage = ""
            if (typeof (armtd3) != "undefined") {
                armtd3.style.backgroundImage = ""
            }
            if (typeof (armtd4) != "undefined") {
                armtd4.style.backgroundImage = ""
            }
            td1 = document.getElementById("a-" + newPillFrames[i].y1 + "," + newPillFrames[i].x1) as HTMLTableCellElement
            td2 = document.getElementById("a-" + newPillFrames[i].y2 + "," + newPillFrames[i].x2) as HTMLTableCellElement
            armtd1 = document.getElementById("a-" + newPillFrames[i].arm.y1 + "," + newPillFrames[i].arm.x1) as HTMLTableCellElement
            armtd1.style.backgroundImage = "url('src/img/hand/" + newPillFrames[i].arm.dir + "_1.png')";
            armtd2 = document.getElementById("a-" + newPillFrames[i].arm.y2 + "," + newPillFrames[i].arm.x2) as HTMLTableCellElement
            armtd2.style.backgroundImage = "url('src/img/hand/" + newPillFrames[i].arm.dir + "_2.png')";
            if (typeof (newPillFrames[i].arm.y3) != "undefined") {
                armtd3 = document.getElementById("a-" + newPillFrames[i].arm.y3 + "," + newPillFrames[i].arm.x3) as HTMLTableCellElement
                armtd3.style.backgroundImage = "url('src/img/hand/" + newPillFrames[i].arm.dir + "_3.png')";
            }
            if (typeof (newPillFrames[i].arm.y4) != "undefined") {
                armtd4 = document.getElementById("a-" + newPillFrames[i].arm.y4 + "," + newPillFrames[i].arm.x4) as HTMLTableCellElement
                armtd4.style.backgroundImage = "url('src/img/hand/" + newPillFrames[i].arm.dir + "_4.png')";
            }

            td1.style.backgroundImage = "url('src/img/" + this.colors[c1] + ".png')";
            td2.style.backgroundImage = "url('src/img/" + this.colors[c2] + ".png')";
            i++;
            if (i == newPillFrames.length) {
                clearInterval(pillInterval)
                lek.move()
                lek.controls();
            }
        }, 50);
    }
}

export default Arm
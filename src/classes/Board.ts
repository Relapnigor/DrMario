import viruses from '../data/Viruses.ts'
import tab from '../data/Boardstate.ts'

/**
 * @interface
 *
 * htmlElements - the HTML building blocks that make up the board
 *
 */

interface htmlElements {
    div: HTMLDivElement
    table: HTMLTableElement
}

/**
 * @class Plansza
 *
 * The game board: builds the 16x8 grid of cells and seeds it with the
 * starting viruses.
 */

class Plansza implements htmlElements {
    div: HTMLDivElement
    table: HTMLTableElement
    vColors = ["red", "blue", "yellow"]
    constructor(div: HTMLDivElement) {
        this.div = div;
        this.table = document.createElement("table")
        this.table.id = "plansza"
        this.div.appendChild(this.table)
        this.create(this.table)
        this.addV()
    }

    /**
     * @method addV
     *
     * Scatters the starting viruses (see data/Viruses.ts for how many)
     * across random, still-empty cells in the lower part of the board,
     * each in a random color.
     */

    addV() {
        let vPos: any = []
        let pos: Array<string> = []
        for (let i = 0; i < viruses; i++) {
            let x;
            let y;
            let c;
            do {
                x = Math.round(Math.random() * 7)
                y = Math.round(Math.random() * 8 + 7)
                c = Math.round(Math.random() * 2)
            }
            while (pos.includes(y + ',' + x))
            vPos.push([(y + "," + x), c])
            pos.push(y + "," + x)
            tab[y][x] = "v" + this.vColors[c][0]
        }
        vPos.forEach(virus => {
            let td = document.getElementById(virus[0]) as HTMLTableCellElement
            td.style.backgroundImage = "url('src/img/covid_" + this.vColors[virus[1]] + ".png')"
        });
    }

    /**
     * @method create
     *
     * Builds the 16-row by 8-column board grid, one <td> per cell,
     * each id'd as "row,col" so other classes can look cells up by
     * position.
     */

    create(tab: HTMLElement) {
        for (let i = 0; i < 16; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < 8; j++) {
                let td = document.createElement("td");
                td.id = i + "," + j;
                td.style.border = "none"
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
    }
}
export default Plansza
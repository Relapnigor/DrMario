
/**
 * @class Points
 *
 * Reads and writes the score, the remaining-virus count, and the high
 * score to/from localStorage, and reflects them in the UI as digit
 * images.
 */

class Points {
    viruses: any;
    score: any;
    top: any;

    constructor(virs: any, score: any, top: any) {
        this.viruses = virs
        this.score = score
        this.top = top
    }

    /**
     * @method updateViruses
     *
     * Reads the current remaining-virus count from localStorage and
     * updates the one or two digit images that display it.
     */

    updateViruses() {

        this.viruses = localStorage.getItem("viruses")
        let vs = this.viruses.toString();
        let virus1 = document.getElementById("p1") as HTMLImageElement
        let virus2 = document.getElementById("p2") as HTMLImageElement
        if (vs.length == 1) {
            virus2.src = "src/img/cyfry/" + vs[0] + ".png"
        }
        else {
            virus1.src = "src/img/cyfry/" + vs[0] + ".png"
            virus2.src = "src/img/cyfry/" + vs[1] + ".png"
        }
    }

    /**
     * @method updateScore
     *
     * Reads the current score from localStorage and updates its
     * digit-by-digit display.
     */

    updateScore() {
        this.score = localStorage.getItem("score")
        for (let i = 0; i < this.score.length; i++) {
            let img = document.getElementById("s" + (i + 1)) as HTMLImageElement
            img.src = "src/img/cyfry/" + this.score[this.score.length - 1 - i] + ".png"

        }

    }

    /**
     * @method loadTop
     *
     * Loads the high score from localStorage and updates its
     * digit-by-digit display.
     */

    loadTop() {
        this.top = localStorage.getItem("top")
        if (this.top != null) {
            for (let i = 0; i < this.top.length; i++) {
                let img = document.getElementById("t" + (i + 1)) as HTMLImageElement
                img.src = "src/img/cyfry/" + this.top[this.top.length - 1 - i] + ".png"
            }
        }
    }

    /**
     *
     * @param score
     * The current score to compare against the stored high score
     *
     * @method updateTop
     * Updates the stored high score, if there isn't one yet or the
     * current score beats it.
     */

    updateTop(score: any) {
        if (this.top == null) {
            localStorage.setItem("top", score)
        }
        else if (this.top < score) {
            localStorage.setItem("top", score)
        }
    }
}

export default Points
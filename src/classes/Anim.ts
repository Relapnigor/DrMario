import overobj from "../data/Gameover.ts"

/**
 * @class Anim
 *
 * Animates one of the three virus icons shown floating in the "flask"
 * area next to the board, orbiting in a slow circle. Once the game is
 * over, the animation switches to a faster, simplified frame pattern.
 */

class Anim {
    id: number;
    img: HTMLImageElement;
    tickNumber: number;
    actFrame: number;
    destId: string;
    repeat: boolean;
    angle: number;
    d: number = 0;
    constructor(id: number, img: HTMLImageElement, destId: string) {
        this.id = id
        this.angle = Math.PI / 3 + this.id * 2
        this.img = img;
        this.tickNumber = 1;
        this.actFrame = 1;
        this.destId = destId;
        this.repeat = true;
    }

    /**
     *
     * @param i
     * The frame number to display
     *
     * @method renderFrame
     * Swaps in the given frame's image and, while the game is still
     * running, nudges the icon a little further around its orbit.
     *
     */

    renderFrame(i: number) {
        this.img.src = "/src/img/" + this.destId + "/" + i + ".png"
        let finish = overobj.getGameover()

        if (!finish) {
            this.d++;
            if (this.d % 20 == 0) {
                this.angle += 0.5
                this.img.style.top = (50 + 75 * Math.cos(this.angle)).toString() + "px";
                this.img.style.left = (105 + 75 * Math.sin(this.angle)).toString() + "px";
            }
        }
    }

    /**
     * @method goAnim
     * Advances the virus animation by one tick. Uses a slower frame
     * pace during normal play, and a faster, two-frame pace once the
     * game has ended.
     *
     */

    goAnim() {
        let finish = overobj.getGameover()
        if (finish && (this.tickNumber % 2 != 0 || this.actFrame % 2 != 0)) {
            this.tickNumber = 2;
            this.actFrame = 2;
        }
        this.renderFrame(this.actFrame);


        if (finish) {
            this.tickNumber += 2;

            if (this.tickNumber == 8) { // move on to the next frame
                this.tickNumber = 2
                this.actFrame += 2;
            }
            if (this.repeat && this.actFrame == 6) this.actFrame = 2; // loop back to the first frame
        }
        else {
            this.tickNumber++;

            if (this.tickNumber == 5) { // move on to the next frame
                this.tickNumber = 1
                this.actFrame++;
            }
            if (this.repeat && this.actFrame == 5) this.actFrame = 1; // loop back to the first frame
        }
    }
}

export default Anim
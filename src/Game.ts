/**
 * @interfaces
 *
 * colorList - array of the pill/virus color values used throughout
 * the game (this comment isn't attached to an interface actually
 * declared in this file - it's left here untouched, since only the
 * language of comments was meant to change, not their placement)
 *
 */






let armDiv = document.getElementById("arm") as HTMLDivElement


import './style.css'
import obj from './data/Pillid.ts'
import overobj from './data/Gameover.ts'
import stageobj from './data/Stagecompleted.ts'
import tab from './data/Boardstate.ts'
import viruses from './data/Viruses.ts'
import Plansza from './classes/Board.ts'
import Tabletka from './classes/Pill.ts'
import Arm from './classes/Arm.ts'
import Anim from './classes/Anim.ts'
import Points from './classes/Points.ts'



let imgsArray: Array<Anim> = []; // array of the running virus animations
let anim = function () {
  for (let i = 0; i < imgsArray.length; i++) {
    imgsArray[i].goAnim()
  }
  setTimeout(() => {
    window.requestAnimationFrame(anim); // nominally 60 frames/sec
  }, 1000 / 5);
}
let cols = ["yellow", "blue", "red"]

for (let i = 0; i < 3; i++) {
  let img = document.getElementById(cols[i]) as HTMLImageElement
  let an = new Anim(i, img, cols[i])
  imgsArray.push(an)
  anim();
}


let div = document.getElementById("tab") as HTMLDivElement;

const punkty = new Points(viruses, 0, 0)
const plan = new Plansza(div)
console.log(plan);

let lek = new Tabletka()
let newPill = new Arm(armDiv)
newPill.goAnim(lek.c1, lek.c2, lek)
punkty.loadTop()

let gameInterval = setInterval(() => {
  punkty.updateViruses()
  punkty.updateScore()
  if (localStorage.getItem("viruses") == "0") {
    punkty.updateTop(localStorage.getItem("score"))
    punkty.loadTop()
    stageobj.setStagecompleted(true);
    let sc = document.getElementById("sc") as HTMLImageElement
    sc.style.visibility = "visible"
    clearInterval(gameInterval)
  }
  else {
    if (tab[2][3] == "0" && tab[2][4] == "0") {
      let next = lek.lock && lek.lock2

      if (next) {

        obj.setIdn()
        lek = new Tabletka()
        newPill = new Arm(armDiv)
        newPill.goAnim(lek.c1, lek.c2, lek)
      }
    }
    else {
      overobj.setGameover(true)
      let lost_dr = document.getElementById("lost") as HTMLImageElement
      lost_dr.style.visibility = "visible"
      let go = document.getElementById("go") as HTMLImageElement
      go.style.visibility = "visible"
    }
  }
}, 1000);
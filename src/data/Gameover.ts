/**
 * @var
 *
 * Tracks whether the game is over (the stack of pills reached the top
 * of the board), read by Anim to switch to the faster end-game virus
 * animation and by game.ts to show the "you lost" message.
 */

let gameover: boolean = false;
let setGameover = (val: boolean) => {
    gameover = val
}

let getGameover = () => {
    return gameover
}

let overobj = {
    gameover: gameover,
    setGameover: setGameover,
    getGameover: getGameover
}


export default overobj
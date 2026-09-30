
/**
 * @var
 *
 * Tracks whether the current stage has been cleared (every virus on
 * the board has been popped), so the UI can show the "stage cleared"
 * message and stop the game loop.
 */

let stagecompleted = false;
let setStagecompleted = (val: boolean) => {
    stagecompleted = val
}

let stageobj = {
    stagecompleted: stagecompleted,
    setStagecompleted: setStagecompleted
}

export default stageobj
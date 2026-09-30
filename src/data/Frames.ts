
/**
 * @static
 *
 * Frame-by-frame positions for the hand-and-pill animation played
 * at the start of every turn, as Dr. Mario's hand lowers a fresh
 * pill into the drop zone. Each entry gives the two cells the pill
 * occupies (x1/y1, x2/y2) and the cells and pose of the hand
 * carrying it (dir is "up", "mid", or "down").
 */

let newPillFrames = [
    { x1: 10, y1: 3, x2: 11, y2: 3, arm: { dir: "up", x1: 11, y1: 4, x2: 11, y2: 5, x3: 11, y3: 6 } },
    { x1: 9, y1: 3, x2: 10, y2: 3, arm: { dir: "up", x1: 11, y1: 4, x2: 11, y2: 5, x3: 11, y3: 6 } },
    { x1: 9, y1: 3, x2: 9, y2: 2, arm: { dir: "up", x1: 11, y1: 4, x2: 11, y2: 5, x3: 11, y3: 6 } },
    { x1: 8, y1: 2, x2: 9, y2: 2, arm: { dir: "up", x1: 11, y1: 4, x2: 11, y2: 5, x3: 11, y3: 6 } },
    { x1: 8, y1: 2, x2: 8, y2: 1, arm: { dir: "up", x1: 11, y1: 4, x2: 11, y2: 5, x3: 11, y3: 6 } },
    { x1: 7, y1: 1, x2: 8, y2: 1, arm: { dir: "mid", x1: 10, y1: 6, x2: 11, y2: 6, x3: 10, y3: 5, x4: 11, y4: 5 } },
    { x1: 7, y1: 1, x2: 7, y2: 0, arm: { dir: "mid", x1: 10, y1: 6, x2: 11, y2: 6, x3: 10, y3: 5, x4: 11, y4: 5 } },
    { x1: 7, y1: 1, x2: 6, y2: 1, arm: { dir: "mid", x1: 10, y1: 6, x2: 11, y2: 6, x3: 10, y3: 5, x4: 11, y4: 5 } },
    { x1: 6, y1: 0, x2: 6, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 5, y1: 1, x2: 6, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 5, y1: 1, x2: 5, y2: 0, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 5, y1: 1, x2: 4, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 4, y1: 0, x2: 4, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 3, y1: 1, x2: 4, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 3, y1: 1, x2: 3, y2: 0, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 3, y1: 1, x2: 2, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 2, y1: 0, x2: 2, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 1, y1: 1, x2: 2, y2: 1, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 1, y1: 1, x2: 1, y2: 2, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 2, x2: 1, y2: 2, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 3, x2: 1, y2: 3, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 4, x2: 1, y2: 4, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 5, x2: 1, y2: 5, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 6, x2: 1, y2: 6, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
    { x1: 0, y1: 7, x2: 1, y2: 7, arm: { dir: "down", x1: 11, y1: 6, x2: 11, y2: 7 } },
]

export default newPillFrames
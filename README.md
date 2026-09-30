# Dr. Mario

*[🇵🇱 Polska wersja README](README.pl.md)*

A TypeScript + Vite recreation of the classic falling-block puzzle game: steer two-colored pill halves down onto a field of viruses, line up 4 or more of the same color to clear them, and clear every virus to complete the stage.

## Features

- A 16x8 board, rendered as an HTML table with CSS background-image sprites (no canvas)
- A two-color falling pill: move left/right, rotate, and either let it fall on its own or hard-drop it
- Matching 4+ same-colored cells (horizontally or vertically) clears them, including any viruses among them, and awards points
- Chain reactions: pieces left floating after a clear fall down and are re-checked for new matches
- A short hand animation lowers every new pill into the drop zone at the start of each turn
- Score, remaining-virus count, and a persisted high score (via `localStorage`), shown as digit sprites
- Three virus icons orbit next to the board, animating faster once the game ends
- Win by clearing every virus; lose if a new pill has nowhere to spawn

## Tech stack

- TypeScript
- [Vite](https://vitejs.dev/) for the dev server and build
- Plain HTML/CSS (DOM-based rendering, styled with per-cell background images) - no framework, no canvas
- [TypeDoc](https://typedoc.org/) for the generated API docs in `docs/`

## Project structure

```
.
├── index.html                 # page shell, loads src/Game.ts
├── src/
│   ├── Game.ts                  # wires everything together and runs the main game loop
│   ├── style.css                 # styling
│   ├── classes/
│   │   ├── Board.ts                 # builds the board grid and seeds the starting viruses
│   │   ├── Pill.ts                   # the falling pill: movement, rotation, locking, matching, falling
│   │   ├── Arm.ts                     # the "hand" animation that delivers each new pill
│   │   ├── Anim.ts                     # the orbiting virus icon animation
│   │   └── Points.ts                    # score / virus-count / high-score display, via localStorage
│   ├── data/
│   │   ├── Boardstate.ts              # the board's cell-by-cell state grid
│   │   ├── Cellids.ts                  # a parallel grid tracking which pill occupies each cell
│   │   ├── Pillid.ts                    # a simple id counter, used to tell pill halves apart
│   │   ├── Frames.ts                     # the hand-lowering animation's frame data
│   │   ├── Viruses.ts                     # starting virus count; resets score/viruses on load
│   │   ├── Gameover.ts                     # tracks whether the game has ended
│   │   └── Stagecompleted.ts                # tracks whether the stage has been cleared
│   └── img/                                   # sprites
└── docs/                       # generated API documentation (see below)
```

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Building

```bash
npm run build
```

Runs a type-check (`tsc`) and then builds a production bundle with Vite into `dist/`.

## API documentation

The `docs/` folder is generated from the TypeDoc comments in the source and isn't rebuilt automatically - regenerate it after changing any code or doc comments with:

```bash
npx typedoc --entryPointStrategy expand --out docs src
```

## How to play

1. A new two-color pill lowers into the drop zone above the board.
2. Move it left/right, rotate it, and either wait for it to fall on its own or press down to drop it faster.
3. Land it so that 4 or more cells of the same color line up (horizontally or vertically) - matched cells clear, and any viruses among them are removed and scored.
4. Clear every virus on the board to complete the stage. If a new pill can't be placed because the stack has reached the top, the game is over.

## Notes

- Code comments and TypeDoc documentation are in English.

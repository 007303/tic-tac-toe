# Browser-Based Tic Tac Toe Application

A responsive, browser-based Tic Tac Toe game built using React and modern component architecture. Features single-player (vs. rule-based AI) and two-player local modes, move tracking, intelligent undo functionality, and persistent session scoring.

---

## 1. Project Overview
This project was developed for an evaluation assignment. While the original specification outlined an Angular frontend and a .NET backend, explicit email instructions from the recruiter confirmed:
> *"Do it in React backend not mandatory"*

To fulfill the requirements efficiently while maintaining clean software engineering standards, the entire business logic (win calculation, draw checks, AI prioritization, and undo stack management) is decoupled into an isolated pure-function service module (`src/gameEngine.js`). This layer can be lifted directly into a .NET controller/service without modifying UI logic.

---

## 2. Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Testing:** Vitest
- **Styling:** Modular CSS

---

## 3. Features Implemented
- **Standard 3x3 Board:** Interactive grid, locks occupied cells, and stops input on game completion.
- **Two Game Modes:**
  - **Two Player Mode (PvP):** Alternating turns between Player X and Player O.
  - **Computer Mode (PvE):** Player X is human; Player O is an automated computer opponent with 300ms reaction delay.
- **AI Decision Priority:**
  1. Win immediately if a winning move is open.
  2. Block Player X if X is one move from winning.
  3. Control the center cell (index 4).
  4. Occupy corners (indices 0, 2, 6, 8).
  5. Occupy any remaining open cell.
- **Move History Table:** Chronological log tracking Move #, Player, and Board Position (`Row R, Column C`).
- **Undo Last Move:**
  - In **Two Player Mode**: Pops the latest single move; restores the turn to that player.
  - In **Computer Mode**: Pops the pair of moves (Computer's last move + Human's last move) to keep the human as Player X.
- **Scoreboard:** Tracks Player X wins, Player O wins, and Draws. Persists across resets until explicitly cleared via "Reset Scoreboard".
- **Win & Draw Highlights:** Automatically highlights winning row, column, or diagonal cells in green.

---

## 4. How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
```bash
git clone <your-repository-url>
cd tic-tac-toe
npm install
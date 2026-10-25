export const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
  ];
  
  export function checkWin(board) {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }
    return null;
  }
  
  export function isDraw(board) {
    return board.every(cell => cell !== null) && !checkWin(board);
  }

  export function getComputerMove(board) {
    const openIndices = board
      .map((val, index) => (val === null ? index : null))
      .filter(val => val !== null);
  
    if (openIndices.length === 0) return null;
  
    for (const index of openIndices) {
      const temp = [...board];
      temp[index] = 'O';
      if (checkWin(temp)?.winner === 'O') return index;
    }
  
    for (const index of openIndices) {
      const temp = [...board];
      temp[index] = 'X';
      if (checkWin(temp)?.winner === 'X') return index;
    }
  
    if (board[4] === null) return 4;
  
    const corners = [0, 2, 6, 8].filter(index => board[index] === null);
    if (corners.length > 0) return corners[0];
  
    return openIndices[0];
  }
import React, { useState, useEffect } from 'react';
import { checkWin, isDraw, getComputerMove } from './game';
import './App.css';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMode, setGameMode] = useState('computer');
  const [moveHistory, setMoveHistory] = useState([]);
  const [status, setStatus] = useState('InProgress'); 
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scoreboard, setScoreboard] = useState({ X: 0, O: 0, draws: 0 });

  useEffect(()=>{
    console.log(board,'board')
  },[board])

  const finalizeGame = (winResult, currentBoard) => {
    if (winResult) {
      setStatus('Won');
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      setScoreboard(prev => ({
        ...prev,
        [winResult.winner]: prev[winResult.winner] + 1
      }));
    } else if (isDraw(currentBoard)) {
      setStatus('Draw');
      setScoreboard(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const executeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;

    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const newMove = {
      moveNumber: moveHistory.length + 1,
      player,
      position: `Row ${row}, Column ${col}`,
      index
    };

    const nextHistory = [...moveHistory, newMove];
    setBoard(newBoard);
    setMoveHistory(nextHistory);

    const winResult = checkWin(newBoard);
    if (winResult || isDraw(newBoard)) {
      finalizeGame(winResult, newBoard);
    } else {
      setCurrentPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const handleCellClick = (index) => {
    if (board[index] !== null || status !== 'InProgress') return;
    if (gameMode === 'computer' && currentPlayer !== 'X') return;
    executeMove(index, currentPlayer);
  };

  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 'O' && status === 'InProgress') {
      const timer = setTimeout(() => {
        const moveIdx = getComputerMove(board);
        if (moveIdx !== null) executeMove(moveIdx, 'O');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, status, board]);

  const handleUndo = () => {
    if (moveHistory.length === 0 || status !== 'InProgress') return;

    if (gameMode === 'person') {
      const nextHistory = moveHistory.slice(0, -1);
      const newBoard = Array(9).fill(null);
      nextHistory.forEach(m => {
        newBoard[m.index] = m.player;
      });
      setBoard(newBoard);
      setMoveHistory(nextHistory);
      setCurrentPlayer(moveHistory[moveHistory.length - 1].player);
    } else {
      const popCount = moveHistory[moveHistory.length - 1].player === 'O' ? 2 : 1;
      const nextHistory = moveHistory.slice(0, -popCount);
      const newBoard = Array(9).fill(null);
      nextHistory.forEach(m => {
        newBoard[m.index] = m.player;
      });
      setBoard(newBoard);
      setMoveHistory(nextHistory);
      setCurrentPlayer('X');
    }
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setMoveHistory([]);
    setStatus('InProgress');
    setWinner(null);
    setWinningLine([]);
  };

  const handleResetScoreboard = () => {
    setScoreboard({ X: 0, O: 0, draws: 0 });
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    handleResetGame();
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>

      <div className="mode-selection">
        <button
          className={gameMode === 'person' ? 'active' : ''}
          onClick={() => handleModeChange('person')}
        >
          Two Player
        </button>
        <button
          className={gameMode === 'computer' ? 'active' : ''}
          onClick={() => handleModeChange('computer')}
        >
          Play Against Computer
        </button>
      </div>

      <div className="status-banner">
        {status === 'InProgress' && <div>Current Turn: <strong>Player {currentPlayer}</strong></div>}
        {status === 'Won' && <div className="win-msg">Winner: <strong>Player {winner}</strong>!</div>}
        {status === 'Draw' && <div className="draw-msg">Game Ended in a <strong>Draw</strong>.</div>}
      </div>

      <div className="main-layout">
        <div className="left-panel">
          <div className="board">
            {board.map((cell, idx) => (
              <button
                key={idx}
                className={`cell ${winningLine.includes(idx) ? 'highlight' : ''}`}
                onClick={() => handleCellClick(idx)}
                disabled={cell !== null || status !== 'InProgress'}
              >
                {cell}
              </button>
            ))}
          </div>

          <div className="controls">
            <button onClick={handleUndo} disabled={moveHistory.length === 0 || status !== 'InProgress'}>
              Undo Last Move
            </button>
            <button onClick={handleResetGame}>Reset Game</button>
          </div>
        </div>

        <div className="right-panel">
          <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div className="score-row">
              <span>Player X: {scoreboard.X}</span>
              <span>Player O: {scoreboard.O}</span>
              <span>Draws: {scoreboard.draws}</span>
            </div>
            <button className="small-btn" onClick={handleResetScoreboard}>
              Reset Scoreboard
            </button>
          </div>

          <div className="history">
            <h3>Move History</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {moveHistory.map(m => (
                    <tr key={m.moveNumber}>
                      <td>{m.moveNumber}</td>
                      <td>{m.player}</td>
                      <td>{m.position}</td>
                    </tr>
                  ))}
                  {moveHistory.length === 0 && (
                    <tr>
                      <td colSpan="3" className="empty-text">No moves yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
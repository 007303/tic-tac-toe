import { describe, it, expect } from 'vitest';
import { checkWin, isDraw, getComputerMove } from './gameEngine';

describe('Game Engine - Winning Logic', () => {
  it('detects a row win correctly', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    const res = checkWin(board);
    expect(res).not.toBeNull();
    expect(res.winner).toBe('X');
    expect(res.line).toEqual([0, 1, 2]);
  });

  it('detects a column win correctly', () => {
    const board = ['O', null, null, 'O', null, null, 'O', null, null];
    const res = checkWin(board);
    expect(res).not.toBeNull();
    expect(res.winner).toBe('O');
    expect(res.line).toEqual([0, 3, 6]);
  });

  it('detects a diagonal win correctly', () => {
    const board = ['X', null, null, null, 'X', null, null, null, 'X'];
    const res = checkWin(board);
    expect(res).not.toBeNull();
    expect(res.winner).toBe('X');
    expect(res.line).toEqual([0, 4, 8]);
  });

  it('returns null when there is no winner', () => {
    const board = ['X', 'O', 'X', null, null, null, null, null, null];
    expect(checkWin(board)).toBeNull();
  });
});

describe('Game Engine - Draw Detection', () => {
  it('detects a draw when all cells are full and no winner exists', () => {
    const board = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ];
    expect(isDraw(board)).toBe(true);
  });

  it('does not detect draw when board is incomplete', () => {
    const board = [
      'X', 'O', 'X',
      null, 'O', 'O',
      'O', 'X', 'X'
    ];
    expect(isDraw(board)).toBe(false);
  });
});

describe('Game Engine - Computer Move Decisions', () => {
  it('prioritizes winning move over blocking', () => {
    // O can win at index 2; X could win at index 8
    const board = [
      'O', 'O', null,
      'X', 'X', null,
      null, null, null
    ];
    expect(getComputerMove(board)).toBe(2);
  });

  it('blocks opponent win if computer cannot win', () => {
    // X can win at index 2
    const board = [
      'X', 'X', null,
      null, 'O', null,
      null, null, null
    ];
    expect(getComputerMove(board)).toBe(2);
  });

  it('takes the center cell (4) if win/block is not applicable and center is open', () => {
    const board = [
      'X', null, null,
      null, null, null,
      null, null, null
    ];
    expect(getComputerMove(board)).toBe(4);
  });

  it('takes a corner cell if center is occupied', () => {
    const board = [
      null, null, null,
      null, 'X', null,
      null, null, null
    ];
    const move = getComputerMove(board);
    expect([0, 2, 6, 8]).toContain(move);
  });

  it('returns null if no moves are available', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(getComputerMove(board)).toBeNull();
  });
});
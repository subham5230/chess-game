import { PIECE } from "./types";

// export const makeMove = (pos: number, player: number, board: number[], piece: string): void => {
// }

export const possibleMoves = (
  pos: number,
  piece: string,
): number[] => {
  switch (piece) {
    case PIECE.KING:
      return kingMoves(pos);
    case PIECE.QUEEN:
        return queenMoves(pos);
    case PIECE.ROOK:
        return rookMoves(pos);
    case PIECE.BISHOP:
        return bishopMoves(pos);
    case PIECE.KNIGHT:
        return knightMoves(pos);
    case PIECE.PAWN:
        return pawnMoves(pos);
  }

    return [];
};

const kingMoves = (pos: number): number[] => {
  const possibleMoves = [];

  if (pos - 8 >= 0) {
    possibleMoves.push(pos - 8);
  }
  if (pos + 8 <= 63) {
    possibleMoves.push(pos + 8);
  }
  if (pos % 8 !== 0) {
    possibleMoves.push(pos - 1);
  }
  if (pos % 8 !== 7) {
    possibleMoves.push(pos + 1);
  }
  if (pos - 9 >= 0 && pos % 8 !== 0) {
    possibleMoves.push(pos - 9);
  }
  if (pos - 7 >= 0 && pos % 8 !== 7) {
    possibleMoves.push(pos - 7);
  }
  if (pos + 7 <= 63 && pos % 8 !== 0) {
    possibleMoves.push(pos + 7);
  }
  if (pos + 9 <= 63 && pos % 8 !== 7) {
    possibleMoves.push(pos + 9);
  }

  return possibleMoves;
};

const rookMoves = (pos: number): number[] => {
  const possibleMoves = [];

  for (let i = 1; i < 8; i++) {
    if (pos - 8 * i >= 0) {
      possibleMoves.push(pos - 8 * i);
    }
    if (pos + 8 * i <= 63) {
      possibleMoves.push(pos + 8 * i);
    }
    if (pos % 8 !== 0) {
      possibleMoves.push(pos - i);
    }
    if (pos % 8 !== 7) {
      possibleMoves.push(pos + i);
    }
  }

  return possibleMoves;
};

const bishopMoves = (pos: number): number[] => {
  const possibleMoves = [];

  for (let i = 1; i < 8; i++) {
    if (pos - 9 * i >= 0 && pos % 8 !== 0) {
      possibleMoves.push(pos - 9 * i);
    }
    if (pos - 7 * i >= 0 && pos % 8 !== 7) {
      possibleMoves.push(pos - 7 * i);
    }
    if (pos + 7 * i <= 63 && pos % 8 !== 0) {
      possibleMoves.push(pos + 7 * i);
    }
    if (pos + 9 * i <= 63 && pos % 8 !== 7) {
      possibleMoves.push(pos + 9 * i);
    }
  }

  return possibleMoves;
};

const queenMoves = (pos: number): number[] => {
  const rook = rookMoves(pos);
  const bishop = bishopMoves(pos);

  return [...rook, ...bishop];
};

const knightMoves = (pos: number): number[] => {
  const possibleMoves = [];

  if (pos - 17 >= 0 && pos % 8 !== 0) {
    possibleMoves.push(pos - 17);
  }
  if (pos - 15 >= 0 && pos % 8 !== 7) {
    possibleMoves.push(pos - 15);
  }
  if (pos - 10 >= 0 && pos % 8 !== 0 && pos % 8 !== 1) {
    possibleMoves.push(pos - 10);
  }
  if (pos - 6 >= 0 && pos % 8 !== 6 && pos % 8 !== 7) {
    possibleMoves.push(pos - 6);
  }
  if (pos + 6 <= 63 && pos % 8 !== 0 && pos % 8 !== 1) {
    possibleMoves.push(pos + 6);
  }
  if (pos + 10 <= 63 && pos % 8 !== 6 && pos % 8 !== 7) {
    possibleMoves.push(pos + 10);
  }
  if (pos + 15 <= 63 && pos % 8 !== 0) {
    possibleMoves.push(pos + 15);
  }
  if (pos + 17 <= 63 && pos % 8 !== 7) {
    possibleMoves.push(pos + 17);
  }

  return possibleMoves;
};

const pawnMoves = (pos: number): number[] => {
  const possibleMoves = [];

  if (pos - 8 >= 0) {
    possibleMoves.push(pos - 8);
  }
  if (pos - 7 >= 0 && pos % 8 !== 7) {
    possibleMoves.push(pos - 7);
  }
  if (pos - 9 >= 0 && pos % 8 !== 0) {
    possibleMoves.push(pos - 9);
  }

  return possibleMoves;
};


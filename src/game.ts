/* eslint-disable @typescript-eslint/no-unused-vars */
import { PIECE, Game } from "./types";

// export const makeMove = (pos: number, player: number, board: number[], piece: string): void => {
// }

export const possibleMoves = (
  pos: number,
  piece: string,
  game: Game
): number[] => {
  switch (piece) {
    case PIECE.KING:
      return kingMoves(pos, game);
    case PIECE.QUEEN:
      return queenMoves(pos, game);
    case PIECE.ROOK:
      return rookMoves(pos, game);
    case PIECE.BISHOP:
      return bishopMoves(pos, game);
    case PIECE.KNIGHT:
      return knightMoves(pos, game);
    case PIECE.PAWN:
      return pawnMoves(pos, game);
  }

  return [];
};

const kingMoves = (pos: number, game: Game): number[] => {
  const possibleMoves = [];

  if (pos - 8 >= 0 && game.squares[pos - 8].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 8);
  }
  if (pos + 8 <= 63 && game.squares[pos + 8].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 8);
  }
  if (pos % 8 !== 0 && game.squares[pos - 1].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 1);
  }
  if (pos % 8 !== 7 && game.squares[pos + 1].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 1);
  }
  if (pos - 9 >= 0 && pos % 8 !== 0 && game.squares[pos - 9].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 9);
  }
  if (pos - 7 >= 0 && pos % 8 !== 7 && game.squares[pos - 7].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 7);
  }
  if (pos + 7 <= 63 && pos % 8 !== 0 && game.squares[pos + 7].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 7);
  }
  if (pos + 9 <= 63 && pos % 8 !== 7 && game.squares[pos + 9].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 9);
  }

  return possibleMoves;
};

const rookMoves = (pos: number, game: Game): number[] => {
  const upMoves = createPathUp(pos, game);
  const downMoves = createPathDown(pos, game);
  const leftMoves = createPathLeft(pos, game);
  const rightMoves = createPathRight(pos, game);

  return [...upMoves, ...downMoves, ...leftMoves, ...rightMoves];
};

const bishopMoves = (pos: number, game: Game): number[] => {
  const upLeftMoves = createPathUpLeft(pos, game);
  const upRightMoves = createPathUpRight(pos, game);
  const downLeftMoves = createPathDownLeft(pos, game);
  const downRightMoves = createPathDownRight(pos, game);

  return [...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves];
};

const queenMoves = (pos: number, game: Game): number[] => {
  const rook = rookMoves(pos, game);
  const bishop = bishopMoves(pos, game);

  return [...rook, ...bishop];
};

const knightMoves = (pos: number, game: Game): number[] => {
  const possibleMoves = [];

  if (pos - 17 >= 0 && pos % 8 !== 0 && game.squares[pos - 17].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 17);
  }
  if (pos - 15 >= 0 && pos % 8 !== 7 && game.squares[pos - 15].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 15);
  }
  if (pos - 10 >= 0 && pos % 8 !== 0 && pos % 8 !== 1 && game.squares[pos - 10].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 10);
  }
  if (pos - 6 >= 0 && pos % 8 !== 6 && pos % 8 !== 7 && game.squares[pos - 6].player !== game.squares[pos].player) {
    possibleMoves.push(pos - 6);
  }
  if (pos + 6 <= 63 && pos % 8 !== 0 && pos % 8 !== 1 && game.squares[pos + 6].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 6);
  }
  if (pos + 10 <= 63 && pos % 8 !== 6 && pos % 8 !== 7 && game.squares[pos + 10].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 10);
  }
  if (pos + 15 <= 63 && pos % 8 !== 0 && game.squares[pos + 15].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 15);
  }
  if (pos + 17 <= 63 && pos % 8 !== 7 && game.squares[pos + 17].player !== game.squares[pos].player) {
    possibleMoves.push(pos + 17);
  }

  return possibleMoves;
};

const pawnMoves = (pos: number, game: Game): number[] => {
  const possibleMoves = [];

  if (game.squares[pos].player === 1) {
    if (pos - 8 >= 0 && game.squares[pos - 8].payload === PIECE.EMPTY) {
      possibleMoves.push(pos - 8);

      if (
        game.player1firstMove === false &&
        pos - 16 >= 0 &&
        game.squares[pos - 16].payload === PIECE.EMPTY
      ) {
        possibleMoves.push(pos - 16);
      }
    }

    if (pos - 7 >= 0 && game.squares[pos - 7].player === 2) {
      possibleMoves.push(pos - 7);
    }

    if (pos - 9 >= 0 && game.squares[pos - 9].player === 2) {
      possibleMoves.push(pos - 9);
    }
  } else if (game.squares[pos].player === 2) {
    if (pos + 8 <= 63 && game.squares[pos + 8].payload === PIECE.EMPTY) {
      possibleMoves.push(pos + 8);

      if (
        game.player2firstMove === false &&
        pos + 16 <= 63 &&
        game.squares[pos + 16].payload === PIECE.EMPTY
      ) {
        possibleMoves.push(pos + 16);
      }
    }

    if (pos + 7 <= 63 && game.squares[pos + 7].player === 1) {
      possibleMoves.push(pos + 7);
    }

    if (pos + 9 <= 63 && game.squares[pos + 9].player === 1) {
      possibleMoves.push(pos + 9);
    }
  }

  return possibleMoves;
};

const createPathUp = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos - 8 * i >= 0) {
      if (
        game.squares[pos - 8 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 8 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos - 8 * i);

      if (
        game.squares[pos - 8 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 8 * i].player !== game.squares[pos].player
      ) {
        break;
      }
    }
  }

  return path;
};

const createPathDown = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos + 8 * i <= 63) {
      if (
        game.squares[pos + 8 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 8 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos + 8 * i);

      if (
        game.squares[pos + 8 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 8 * i].player !== game.squares[pos].player
      ) {
        break;
      }
    }
  }

  return path;
};

const createPathLeft = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos - i >= 0 && pos % 8 !== 0) {
      if (
        game.squares[pos - i].payload !== PIECE.EMPTY &&
        game.squares[pos - i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos - i);

      if (
        game.squares[pos - i].payload !== PIECE.EMPTY &&
        game.squares[pos - i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos - i) % 8 === 0) {
        break;
      }
    }
  }

  return path;
};

const createPathRight = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos + i <= 63 && pos % 8 !== 7) {
      if (
        game.squares[pos + i].payload !== PIECE.EMPTY &&
        game.squares[pos + i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos + i);

      if (
        game.squares[pos + i].payload !== PIECE.EMPTY &&
        game.squares[pos + i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos + i) % 8 === 7) {
        break;
      }
    }
  }

  return path;
};

const createPathUpLeft = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos - 9 * i >= 0 && pos % 8 !== 0) {
      if (
        game.squares[pos - 9 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 9 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos - 9 * i);

      if (
        game.squares[pos - 9 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 9 * i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos - 9 * i) % 8 === 0) {
        break;
      }
    }
  }

  return path;
}

const createPathUpRight = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos - 7 * i >= 0 && pos % 8 !== 7) {
      if (
        game.squares[pos - 7 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 7 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos - 7 * i);

      if (
        game.squares[pos - 7 * i].payload !== PIECE.EMPTY &&
        game.squares[pos - 7 * i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos - 7 * i) % 8 === 7) {
        break;
      }
    }
  }

  return path;
}

const createPathDownLeft = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos + 7 * i <= 63 && pos % 8 !== 0) {
      if (
        game.squares[pos + 7 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 7 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos + 7 * i);

      if (
        game.squares[pos + 7 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 7 * i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos + 7 * i) % 8 === 0) {
        break;
      }
    }
  }

  return path;
}

const createPathDownRight = (pos: number, game: Game): number[] => {
  const path = [];

  for (let i = 1; i < 8; i++) {
    if (pos + 9 * i <= 63 && pos % 8 !== 7) {
      if (
        game.squares[pos + 9 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 9 * i].player === game.squares[pos].player
      ) {
        break;
      }

      path.push(pos + 9 * i);

      if (
        game.squares[pos + 9 * i].payload !== PIECE.EMPTY &&
        game.squares[pos + 9 * i].player !== game.squares[pos].player
      ) {
        break;
      }

      if ((pos + 9 * i) % 8 === 7) {
        break;
      }
    }
  }

  return path;
}

export enum PIECE {
    EMPTY = 'EMPTY',
    KNIGHT = 'KNIGHT',
    PAWN = 'PAWN',
    BISHOP = 'BISHOP',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING'
}

export enum PLAYER {
    PLAYER1 = 1,
    PLAYER2 = 2
}

export type Square = {
    color: string;
    payload: PIECE;
    pos: number;
    player: number | null;
    highlighted?: boolean;
  };

export type Game = {
    currentPlayer: PLAYER;
    selectedSquare: number | null;
    player1FallenPieces: PIECE[];
    player2FallenPieces: PIECE[];
    player1firstMove: boolean;
    player2firstMove: boolean;
    highlightedSquares: number[];
    squares: Square[];
}
/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";

import { PIECE, Game, Square } from "../types";



interface GameProviderProps {
  children: ReactNode;
}

type GameAction = Game;

const GameContext = createContext<Game | null>(null);

const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);

export function GameProvider({ children }: GameProviderProps) {
  const [game, dispatch] = useReducer(gameReducer, intialGame);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

function gameReducer(game: Game, action: GameAction) {
  return action;
}

const intialGame = {
    currentPlayer: 1,
    player1firstMove: false,
    player2firstMove: false,
    selectedSquare: null,
    highlightedSquares: [],
    squares: renderGame(),
}

function renderGame(): Square[] {
  const squares = Array(64).fill(null);

  for (let i = 0; i < 64; i++) {
    let color = "bg-slate-400";
    let payload = PIECE.EMPTY;
    let player = null;

    if (i >= 8 && i < 16) {
      payload = PIECE.PAWN;
      player = 2;
    } else if (i >= 48 && i < 56) {
      payload = PIECE.PAWN;
      player = 1;
    } else if (i === 0 || i === 7) {
      payload = PIECE.ROOK;
      player = 2;
    } else if (i === 56 || i === 63) {
      payload = PIECE.ROOK;
      player = 1;
    } else if (i === 1 || i === 6) {
      payload = PIECE.KNIGHT;
      player = 2;
    } else if (i === 57 || i === 62) {
      payload = PIECE.KNIGHT;
      player = 1;
    } else if (i === 2 || i === 5) {
      payload = PIECE.BISHOP;
      player = 2;
    } else if (i === 58 || i === 61) {
      payload = PIECE.BISHOP;
      player = 1;
    } else if (i === 3) {
      payload = PIECE.QUEEN;
      player = 2;
    } else if (i === 59) {
      payload = PIECE.QUEEN;
      player = 1;
    } else if (i === 4) {
      payload = PIECE.KING;
      player = 2;
    } else if (i === 60) {
      payload = PIECE.KING;
      player = 1;
    }

    if (i % 2 === 0 && Math.floor(i / 8) % 2 === 0) color = "bg-slate-600";
    if (i % 2 === 1 && Math.floor(i / 8) % 2 === 1) color = "bg-slate-600";

    squares[i] = {
      color,
      payload,
      pos: i,
      player,
    };
  }

  return squares;
}

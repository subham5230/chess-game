import { possibleMoves } from "../game";
import { useGame, useGameDispatch } from "../Contexts/GameContext";
import { PIECE } from "../types";
import {
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
} from "react-icons/fa";

type Props = {
  color: string;
  payload: PIECE;
  pos: number;
  player: number | null;
};

const getPieceIcon = (piece: PIECE, player: number) => {
  switch (piece) {
    case PIECE.PAWN:
      return player === 2 ? (
        <FaChessPawn className="text-black" />
      ) : (
        <FaChessPawn className="text-white" />
      );
    case PIECE.ROOK:
      return player === 2 ? (
        <FaChessRook className="text-black" />
      ) : (
        <FaChessRook className="text-white" />
      );
    case PIECE.KNIGHT:
      return player === 2 ? (
        <FaChessKnight className="text-black" />
      ) : (
        <FaChessKnight className="text-white" />
      );
    case PIECE.BISHOP:
      return player === 2 ? (
        <FaChessBishop className="text-black" />
      ) : (
        <FaChessBishop className="text-white" />
      );
    case PIECE.QUEEN:
      return player === 2 ? (
        <FaChessQueen className="text-black" />
      ) : (
        <FaChessQueen className="text-white" />
      );
    case PIECE.KING:
      return player === 2 ? (
        <FaChessKing className="text-black" />
      ) : (
        <FaChessKing className="text-white" />
      );
    default:
      return "";
  }
};

const Square = (props: Props) => {
  const dispatch = useGameDispatch();
  const game = useGame();

  return (
    <button
      onClick={handleClick}
      className={`border border-slate-700 flex items-center justify-center ${
        game?.highlightedSquares?.includes(props.pos)
          ? " bg-green-200"
          : props.color
      }`}
    >
      {props.payload !== PIECE.EMPTY && props.player && (
        <div className="text-3xl">
          {getPieceIcon(props.payload, props.player)}
        </div>
      )}
    </button>
  );

  function handleClick() {
    if (!game || !dispatch) return;

    if (
      !game.highlightedSquares.includes(props.pos) &&
      game.currentPlayer !== props.player
    )
      return;
    if (
      !game.highlightedSquares.includes(props.pos) &&
      props.payload == PIECE.EMPTY
    ) {
      dispatch({ ...game, highlightedSquares: [], selectedSquare: null });
      return;
    }

    if (
      game.highlightedSquares.includes(props.pos) &&
      game.selectedSquare !== null
    ) {
      handleMakeMove(game.selectedSquare, props.pos);
      return;
    }

    getPossibleMoves();
  }

  function handleMakeMove(from: number, to: number) {
    if (!game || !dispatch) return;

    const squares = [...game.squares];

    if (!squares[from] || !squares[to]) return;

    if (squares[to].payload !== PIECE.EMPTY) {
      if (squares[to].player === squares[from].player) {
        dispatch({ ...game, highlightedSquares: [], selectedSquare: null });
        return;
      }

      initiateAttack(from, to);
      return;
    }

    squares[to] = {
      ...squares[to],
      payload: squares[from].payload,
      player: squares[from].player,
    };
    squares[from] = { ...squares[from], payload: PIECE.EMPTY, player: null };

    if (game.currentPlayer === 1 && game.player1firstMove === false) {
      dispatch({
        ...game,
        squares,
        highlightedSquares: [],
        selectedSquare: null,
        currentPlayer: 2,
        player1firstMove: true,
      });
      return;
    }
    if (game.currentPlayer === 2 && game.player2firstMove === false) {
      dispatch({
        ...game,
        squares,
        highlightedSquares: [],
        selectedSquare: null,
        currentPlayer: 1,
        player2firstMove: true,
      });
      return;
    }
    dispatch({
      ...game,
      squares,
      highlightedSquares: [],
      selectedSquare: null,
      currentPlayer: game.currentPlayer === 1 ? 2 : 1,
    });
  }

  function getPossibleMoves() {
    if (!game || !dispatch) return;

    const positions = possibleMoves(props.pos, props.payload, game);

    highlightSquares(positions);
  }

  function highlightSquares(positions: number[]) {
    if (!game || !dispatch) return;

    dispatch({
      ...game,
      highlightedSquares: positions,
      selectedSquare: props.pos,
    });
  }

  function initiateAttack(from: number, to: number) {
    if (!game || !dispatch) return;

    const squares = [...game.squares];

    if (!squares[from] || !squares[to]) return;

    const fallenPiece = squares[to];

    if (!fallenPiece) return;

    if (fallenPiece.player === 1) {
      squares[to] = {
        ...squares[to],
        payload: squares[from].payload,
        player: squares[from].player,
      };

      squares[from] = { ...squares[from], payload: PIECE.EMPTY, player: null };
      dispatch({
        ...game,
        squares,
        currentPlayer: 1,
        highlightedSquares: [],
        selectedSquare: null,
        player1FallenPieces: [...game.player1FallenPieces, fallenPiece.payload],
      });
      return;
    }

    if (fallenPiece.player === 2) {
      squares[to] = {
        ...squares[to],
        payload: squares[from].payload,
        player: squares[from].player,
      };

      squares[from] = { ...squares[from], payload: PIECE.EMPTY, player: null };

      dispatch({
        ...game,
        squares,
        currentPlayer: 2,
        highlightedSquares: [],
        selectedSquare: null,
        player2FallenPieces: [...game.player2FallenPieces, fallenPiece.payload],
      });
      return;
    }
  }
};

export default Square;

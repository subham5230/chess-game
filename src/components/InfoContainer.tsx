import {
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
} from "react-icons/fa";

import { PIECE } from "../types";
import { useGame } from "../Contexts/GameContext";

const InfoContainer = () => {
  const game = useGame();

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

  return (
    <div>
      <h1 className="font-bold text-2xl text-white">Chess Mania</h1>
      <div className="text-white mt-4">
        Player &nbsp;
        {game?.currentPlayer && game?.currentPlayer === 1 ? (
          <div className="w-[12px] h-[12px] bg-white border border-black inline-block"></div>
        ) : (
          <div className="w-[12px] h-[12px] bg-black border border-white inline-block"></div>
        )}
        &nbsp; make your move
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mt-6">Fallen Pieces</h3>
        <div className="flex flex-col gap-y-4 p-3 rounded-lg bg-slate-600 mt-[8px]">
          <div className="flex flex-row flex-wrap gap-4">
            {game?.player1FallenPieces.map((piece, index) => (
              <div key={"p1" + index} className="text-white text-2xl">
                {getPieceIcon(piece, 1)}
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            {game?.player2FallenPieces.map((piece, index) => (
              <div key={"p2" + index} className="text-white text-2xl">
                {getPieceIcon(piece, 2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoContainer;

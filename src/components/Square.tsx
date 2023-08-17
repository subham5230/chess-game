import { PIECE } from "../types";
import {
    FaChessKing,
    FaChessKnight,
    FaChessPawn,
    FaChessQueen,
    FaChessRook,
    FaChessBishop
} from "react-icons/fa";

type Props = {
  color: string;
  onClick?: () => void;
  payload: PIECE;
  player: number | null;
};

const getPieceIcon = (piece: PIECE, player: number) => {
    switch (piece) {
        case PIECE.PAWN:
        return player === 1 ? <FaChessPawn className='text-black' /> : <FaChessPawn className='text-white' />;
        case PIECE.ROOK:
        return player === 1 ? <FaChessRook className='text-black' /> : <FaChessRook className='text-white' />;
        case PIECE.KNIGHT:
        return player === 1 ? <FaChessKnight className='text-black' /> : <FaChessKnight className='text-white' />;
        case PIECE.BISHOP:
        return player === 1 ? <FaChessBishop className='text-black' /> : <FaChessBishop className='text-white' />;
        case PIECE.QUEEN:
        return player === 1 ? <FaChessKing className='text-black' /> : <FaChessKing className='text-white' />;
        case PIECE.KING:
        return player === 1 ? <FaChessQueen className='text-black' /> : <FaChessQueen className='text-white' />;
        default:
        return "";
    }
};

const Square = (props: Props) => {
  return (
    <button className={`border border-slate-700 flex items-center justify-center ${props.color}`}>
      {props.payload !== PIECE.EMPTY && props.player && (
        <div className="text-3xl">{getPieceIcon(props.payload, props.player)}</div>
        )}  
    </button>
  );
};

export default Square;

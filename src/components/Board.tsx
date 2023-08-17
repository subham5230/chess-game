import React from "react";
import Square from "./Square";
import { PIECE } from "../types";

function Board() {
  const squares = Array(64).fill(null);

  for (let i = 0; i < 64; i++) {
    let color = "bg-slate-400";
    let payload = PIECE.EMPTY;
    let player = null;

    if (i >= 8 && i < 16) {
      payload = PIECE.PAWN;
      player = 1;
    } else if (i >= 48 && i < 56) {
      payload = PIECE.PAWN;
      player = 2;
    } else if (i === 0 || i === 7) {
      payload = PIECE.ROOK;
      player = 1;
    } else if (i === 56 || i === 63) {
      payload = PIECE.ROOK;
      player = 2;
    } else if (i === 1 || i === 6) {
      payload = PIECE.KNIGHT;
      player = 1;
    } else if (i === 57 || i === 62) {
      payload = PIECE.KNIGHT;
      player = 2;
    } else if (i === 2 || i === 5) {
      payload = PIECE.BISHOP;
      player = 1;
    } else if (i === 58 || i === 61) {
      payload = PIECE.BISHOP;
      player = 2;
    } else if (i === 3) {
      payload = PIECE.QUEEN;
      player = 1;
    } else if (i === 59) {
      payload = PIECE.QUEEN;
      player = 2;
    } else if (i === 4) {
      payload = PIECE.KING;
      player = 1;
    } else if (i === 60) {
      payload = PIECE.KING;
      player = 2;
    }

    if(i % 2 === 0 && Math.floor(i / 8) % 2 === 0) color = "bg-slate-600";
    if(i % 2 === 1 && Math.floor(i / 8) % 2 === 1) color = "bg-slate-600";


    squares[i] = (
      <Square key={i} color={color} payload={payload} player={player} />
    );
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 auto-rows-fr auto-cols-fr gap-0 w-[600px] h-[600px] mx-auto relative">
      {squares}
    </div>
  );
}

export default Board;

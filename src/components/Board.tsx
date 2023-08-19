import Square from "./Square";
import { useGame } from "../Contexts/GameContext";

function Board() {
  const game = useGame();

  return (
    <>
    <div className="grid grid-cols-8 grid-rows-8 auto-rows-fr auto-cols-fr gap-0 w-[600px] h-[600px] mx-auto relative">
      {game?.squares?.map((square, index) => (
        <Square
          key={"sqr" + index}
          color={square.color}
          payload={square.payload}
          pos={square.pos}
          player={square.player}
        />
      ))}
    </div>
    </>
  );
}

export default Board;

import Board from "./components/Board";
import InfoContainer from "./components/InfoContainer";
import { GameProvider } from "./Contexts/GameContext";

function App() {
  return (
    <GameProvider>
      <div className="w-screen h-screen bg-slate-800 overflow-hidden p-10 flex">
        <div className="flex-1">
          <Board />
        </div>
        <div className="w-[400px]">
          <InfoContainer />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;

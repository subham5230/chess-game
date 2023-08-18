import Board from "./components/Board";
import { GameProvider } from "./Contexts/GameContext";

function App() {
  return (
    <GameProvider>
      <div className="w-screen h-screen bg-slate-800 overflow-hidden p-10">
        <h1 className="font-bold text-2xl text-white">Chess game</h1>
        <Board />
      </div>
    </GameProvider>
  );
}

export default App;

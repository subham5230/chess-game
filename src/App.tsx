import Board from "./components/Board"


function App() {
  return (
    <div className="w-screen h-screen bg-slate-800 overflow-hidden p-10">
      <h1 className="font-bold text-2xl text-white">Chess game</h1>
      <Board />
    </div>
  )
}

export default App

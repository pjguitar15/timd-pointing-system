import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import GameSelect from "./pages/GameSelect";
import GameEdit from "./pages/GameEdit";
import GameProvider from "./Context/GameContextProvider";

export default function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route
            path='/'
            element={<Welcome />}
          />
          <Route
            path='/game-select'
            element={<GameSelect />}
          />
          <Route
            path='/game'
            element={<Game />}
          />
          <Route
            path='/game/edit'
            element={<GameEdit />}
          />
        </Routes>
      </GameProvider>
    </Router>
  );
}

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Welcome from "./pages/Welcome";
import GameSelect from "./pages/GameSelect";
import GameEdit from "./pages/GameEdit";
import GameProvider from "./Context/GameContextProvider";
import AllGames from "./pages/AllGames";
import GameCreate from "./pages/GameCreate";

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
            path='/game-create'
            element={<GameCreate />}
          />
          <Route
            path='/all-games'
            element={<AllGames />}
          />
          <Route
            path='/game/:id'
            element={<Game />}
          />
          <Route
            path='/game/edit/:id'
            element={<GameEdit />}
          />
        </Routes>
      </GameProvider>
    </Router>
  );
}

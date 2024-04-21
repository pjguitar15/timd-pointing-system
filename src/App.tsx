import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Court1 from "./pages/Court1";
import Welcome from "./pages/Welcome";
import CourtSelect from "./pages/CourtSelect";
import Court2 from "./pages/Court2";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Welcome />}
        />
        <Route
          path='/court-select'
          element={<CourtSelect />}
        />
        <Route
          path='/court-1'
          element={<Court1 />}
        />
        <Route
          path='/court-2'
          element={<Court2 />}
        />
      </Routes>
    </Router>
  );
}

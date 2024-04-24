import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Court from "./pages/Court";
import Welcome from "./pages/Welcome";
import CourtSelect from "./pages/CourtSelect";
import CourtEdit from "./pages/CourtEdit";
import CourtProvider from "./Context/CourtContextProvider";

export default function App() {
  return (
    <Router>
      <CourtProvider>
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
            path='/court'
            element={<Court />}
          />
          <Route
            path='/court/edit'
            element={<CourtEdit />}
          />
        </Routes>
      </CourtProvider>
    </Router>
  );
}

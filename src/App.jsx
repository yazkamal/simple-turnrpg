import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import Battle from "./pages/Battle";
import Chapters from "./pages/Chapters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/battle/:id" element={<Battle />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Radar from './pages/Radar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radar" element={<Radar />} />
      </Routes>
    </Router>
  );
}

export default App;

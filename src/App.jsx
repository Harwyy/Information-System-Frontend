import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/main.css';
import Address from './pages/Address';
import Coordinates from './pages/Coordinates';
import Home from './pages/Home';
import Location from './pages/Location';
import Organization from './pages/Organization';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coordinates" element={<Coordinates />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/addresses" element={<Address />} />
          <Route path="/organizations" element={<Organization />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

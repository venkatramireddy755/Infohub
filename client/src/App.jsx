
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>🌐 InfoHub</h1>

        <div className="nav">
           <NavLink
              to="/weather"
              className={({ isActive }) => (isActive ? "active-tab" : "")}>
              <button>Weather</button>
            </NavLink>
            <NavLink
              to="/currency"
              className={({ isActive }) => (isActive ? "active-tab" : "")}>
              <button>Currency</button>
            </NavLink>
            <NavLink
              to="/quotes"
              className={({ isActive }) => (isActive ? "active-tab" : "")}>
              <button>Quotes</button>
            </NavLink>
        </div>

        <Routes>
          <Route path="/" element={<WeatherModule />} />
          <Route path="/weather" element={<WeatherModule />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/quotes" element={<QuoteGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

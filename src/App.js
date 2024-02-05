import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Pages/Login";
import ProcessAndStatistic from "./Pages/ProcessAndStatistic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home/" element={<Dashboard />}>
          <Route index element={<ProcessAndStatistic />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

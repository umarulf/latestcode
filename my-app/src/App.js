import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppPage from "./pages/AppPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <div className="App  ">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

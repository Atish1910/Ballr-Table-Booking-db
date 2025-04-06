import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Navbar from "./components/Navbar";
import Console from "./components/section/Console";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (storedLogin === "true" && storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="container text-center mt-3">
            <h2>Welcome, {loggedInUser?.name || "User"}!</h2>
          </div>
          <Routes>
            <Route path="/" element={<Navigate to={`/${new Date().toISOString().slice(0, 10)}`} />} />
            <Route path="/:date" element={<Console />} />
          </Routes>
          <div className="text-center">
            <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

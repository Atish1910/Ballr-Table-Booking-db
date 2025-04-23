import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Navbar from "./components/Navbar";
import Console from "./components/section/Console";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import LogoutButton from "./LogoutButton";
import TableBookings from "./components/bookings/TableBookings";
import Pr from "./components/login/Pr";
import MyBookings from "./components/bookings/MyBookings";

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


  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="container text-center mt-3">
            <h2>Welcome, {loggedInUser?.name}!</h2> {/* Show logged-in user's phone */}
          </div>
          {/* <ExlusiveVip /> */}
          <Routes>
            <Route path="/" element={<Navigate to={`/${new Date().toISOString().slice(0, 10)}`} />} />
            <Route path="/:date" element={<Console />} />
            <Route  path="/bookings" element={<TableBookings />}></Route>
            <Route path="/pr" element={<Pr></Pr>}></Route>
            <Route path="/mybookings" element={<MyBookings></MyBookings>}></Route>
          </Routes>
          <div className="text-center">
            <LogoutButton setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser}></LogoutButton>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

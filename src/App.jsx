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
  const [isLoggedIn, setIsLoggedIn] = useState(false); //true/false value to check if a user is logged in.
  const [loggedInUser, setLoggedInUser] = useState(null); //stores the logged-in user's data (like name, phone, etc.).


  //2. Check Local Storage (useEffect)
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn"); // store user details in local storage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser")); 

    if (storedLogin === "true" && storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, []);
  // if the app is open by user by 1st time it will check if yuser is alredy loggedin or not?, if user data is already present in DB the value is TRUE
  // else value is false & user redirect to login.jsx


  return (
    <Router>
      {isLoggedIn ? (
      // 4. Routes When Logged In
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
            {/* LogoutButton is a separate component.
            It will clear login and user data, and redirect user back to login page. */}
          </div>
        </>
      ) : (
        // 5. Routes When NOT Logged In
        <Routes>
          <Route path="/*" element={<Login setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

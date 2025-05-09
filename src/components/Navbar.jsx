import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Pr from "./login/Pr";
import TableBookings from "./bookings/TableBookings";
import logo from "../img/logo/1.png";

function Navbar() {
    
  const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    

    const { date } = useParams(); // Get selected date from URL
    const today = new Date(date).toLocaleDateString("en-GB");

    // Generate dates dynamically
    const dates = Array.from({ length: 6 }, (_, i) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + i);
        return newDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    });

    function handleRedirect() {
        navigate("/TableBookings")
    }

    return (
        <section className="py-3 border navbar_01">
            <div className="container-fluid container-lg py-3">
                <div className="row">
                <h1 className="text-center h3">Table Booking App</h1>
                </div>
                <div className="d-flex justify-content-between px-0 border align-items-center mb-3 py-2  px-lg-5">
                        <Link to="/" className=" border-0"><img src={logo} alt="Logo" /></Link>
                        <div className="">
                            {
                                storedUser?.accountType === "Admin" && <Link to="/pr" className="btn c_btn">PR</Link>
                            }
                        </div>
                        <div className="">
                            <Link to="/mybookings" className="btn c_btn_02">My Bookings</Link>
                        </div>
                        <div className="">
                            <Link to="/bookings" className="btn c_btn_02">All Bookings</Link>
                        </div>
                </div>
                <div className="row text-center" >
                    {dates.map((d, index) => {
                        const dateObj = new Date(d);
                        const day = dateObj.getDate(); // Get date (e.g., 30)
                        const dayLetter = dateObj.toLocaleDateString("en-GB", { weekday: "short" }).charAt(0); // Get first letter of weekday (e.g., "S" for Sunday)

                        return (
                            <div key={index} className="col">
                                <NavLink 
                                    to={`/${d}`} 
                                    className={({ isActive }) => isActive ? "active-link" : ""}
                                >
                                    <span>{day}</span>
                                    <span>{dayLetter}</span>
                                     
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Navbar;

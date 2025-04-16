import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Pr from "./login/Pr";
import GetPostApi from "./login/GetPostApi";
import Practice from "./login/Practice";

function Navbar() {

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    

    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const { date } = useParams(); // Get selected date from URL
    

    // Generate dates dynamically
    const dates = Array.from({ length: 6 }, (_, i) => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + i);
        return newDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    });

    return (
        <section className="py-3 border navbar_01">
            <div className="container-fluid container-lg py-3">
                <div className="d-flex justify-content-between align-items-center border mb-3 py-2  px-5">
                        <img src="src/img/logo/1.png" alt="Logo" />
                        <div className="">
                            {storedUser?.accountType === "Admin" && <Pr></Pr>}
                        </div>
                        <h1 className="text-center h3">Table Booking App</h1>
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

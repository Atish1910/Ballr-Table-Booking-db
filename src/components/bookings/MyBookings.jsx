import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  
  const apiUrl = import.meta.env.REACT_BASE_URL;

  /// Fetch All Bookings (GET API)
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const res = await axios.get(`https://ballr-mern-ashish.onrender.com/getallbookings`);
  
      // Filter bookings by logged-in PR name
      const userBookings = res.data.data.filter(
        (booking) => booking.prName === loggedInUser.name
      );
  
      // Sort by currDate descending (latest first)
      const sortedBookings = userBookings.sort((a, b) => {
        return new Date(b.currDate) - new Date(a.currDate);
      });
  
      setBookings(sortedBookings);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      toast.error("Failed to fetch bookings");
    }
  };
  
  


  return (
    <>
      <div className="modal-content">
      <div className=" border bg-gold py-2">
          <h1 className="fs-5  text-center text-white" >All Bookings</h1>
        </div>

            <div className="modal-body">
              <div className="row">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Table</th>
                      <th>PR Name</th>
                      <th>Guest Name</th>
                      <th>Guest Quantity</th>
                      <th>Booking Date</th>
                      <th>Booked At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr key={booking._id}>
                          <td>{index + 1}</td>
                          <td>{booking.tableNo}</td>
                          <td>{booking.prName}</td>
                          <td>{booking.guestName}</td>
                          <td>{booking.guestQuantity}</td>
                          <td>{booking.bookedDate}</td>
                          <td>{booking.currDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No bookings available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
    </>
  );
}

export default MyBookings;

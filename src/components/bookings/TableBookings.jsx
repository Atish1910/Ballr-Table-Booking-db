import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function TableBookings() {
  const [bookings, setBookings] = useState([]);
  
  const apiUrl = import.meta.env.REACT_BASE_URL;

  /// Fetch All Bookings (GET API)
  useEffect(() => {
    fetchBookings();
  }, []);
  

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/getallbookings`);
  
      const sortedBookings = res.data.data.sort((a, b) => {
        const dateA = new Date(a.currDate);
        const dateB = new Date(b.currDate);
        return dateB.getTime() - dateA.getTime(); // Newest first
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
                          <td>{bookings.length - index}</td> {/* Latest = #1 */}
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

export default TableBookings;

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function TableBookings() {
  const [bookings, setBookings] = useState([]);

  /// Fetch All Bookings (GET API)
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getallbookings");
      setBookings(res.data.data);  // assuming your API returns data in res.data.data
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      toast.error("Failed to fetch bookings");
    }
  };


  return (
    <>
      <a
        className="btn btn-primary"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Open Bookings
      </a>

      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                All Bookings
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
        </div>
      </div>
    </>
  );
}

export default TableBookings;

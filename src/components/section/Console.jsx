// Import necessary React hooks and libraries
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Console() {
  const { date } = useParams();
  const currentDate = new Date(date).toLocaleDateString("en-GB");
  const [bookings, setBookings] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [bookedTables, setBookedTables] = useState({});

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {
    name: "N/A",
  };

  /// Get All Booking in table (GET API)
  useEffect(() => {
    fetchBookings();
  }, [date]);

  const fetchBookings = async () => {
    debugger
    try {
      const res = await axios.get("http://localhost:4000/getallbookings");
      // Filter bookings matching the URL date (bookedDate field)
      const formattedUrlDate = convertDateFormat(date);

      const filteredBookings = res.data.data.filter(
        (booking) => booking.bookedDate === formattedUrlDate
      );
      setBookings(filteredBookings);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };
  const convertDateFormat = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };


  // Handle table button click
  function handleTableClick(event) {
    const tableId = event.target.getAttribute("data-table");
    setValue("tableId", tableId);
  }

  // Handle form submission
  async function onSubmit(data) {
    const bookedTables = {
      tableNo: data.tableId,
      booked: true, 
      guestName: data.guestName,
      guestQuantity: data.guestQuantity,
      prName: loggedInUser.name,
      bookedDate: currentDate,
      currDate: new Date().toLocaleString("en-GB"),
    };

    try {
      const response = await axios.post("http://localhost:4000/create-booking",bookedTables);

      if (response.data.success) {
        toast.success("Booking successful!");
        document.getElementById("closeModal").click();
        fetchBookings()
        reset();

      } else {
        toast.error(response.data.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Error while booking, please try again.");
    }
  }

  /// Delete Booking
  const handleDeleteBooking = async (bookingId) => {

    const confirmDelete = window.confirm(`Are you sure you want to Delete This Booking?`);
    if (!confirmDelete) {
      return;  // exit if user cancels
    }
    try {
      const response = await axios.delete(`http://localhost:4000/delete-booking/${bookingId}`);
  
      if (response.data.success) {
        toast.success("Booking deleted successfully!");
        fetchBookings();
        // optionally re-fetch users or update UI
      } else {
        toast.error(response.data.message);
      }
  
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Could not delete user. Please try again.");
    }
  };

  const consoleTables = ["D1", "D2", "D3", "D4"];

  return (
    <section>
      <div className="container-fluid border border-dark py-5">
        <h1 className="text-center fw-bold">01 - Section Console </h1>
        <h2 className="text-center">Table Booking for {currentDate}</h2>

        <div className="row text-center justify-content-center">
  {consoleTables.map((table) => {
    // Check if table is already booked in bookings list
    const isBooked = bookings.find((booking) => booking.tableNo === table);

    return (
      <div key={table} className="col border border-dark py-3">
        {isBooked ? (
          <button className="btn btn-secondary" disabled>
            Sold : {table}
            <br />
            {isBooked.prName}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#bookingModal"
            data-table={table}
            onClick={handleTableClick}
          >
            {table}
          </button>
        )}
      </div>
    );
  })}
</div>


        <div
          className="modal fade"
          id="bookingModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Enter Guest Details</h1>
                <button
                  type="button"
                  id="closeModal"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-control py-3 border border-dark"
                >
                  <input type="hidden" {...register("tableId")} />

                  <input
                    type="text"
                    placeholder="Enter Guest Name"
                    className={`mb-3 form-control ${
                      errors.guestName ? "input-errors" : ""
                    }`}
                    {...register("guestName", { required: true })}
                  />
                  {errors.guestName && (
                    <p className="text-danger">Guest Name is required.</p>
                  )}

                  <input
                    type="number"
                    placeholder="Enter Guest Quantity"
                    className={`mb-3 form-control ${
                      errors.guestQuantity ? "input-errors" : ""
                    }`}
                    {...register("guestQuantity", { required: true })}
                  />
                  {errors.guestQuantity && (
                    <p className="text-danger">Guest Quantity is required.</p>
                  )}

                  <button
                    className="btn btn-success"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Please Wait" : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
      <h3 className="text-center">Booking Details</h3>
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
            <th>Delete Booking</th>
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
                {(loggedInUser.accountType === "Admin" || booking.prName === loggedInUser.name) && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No bookings yet for this date.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      </div>
    </section>
  );
}

export default Console;

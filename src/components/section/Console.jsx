// Import necessary React hooks and libraries
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Console() {
  const { date } = useParams();
  const currentDate = new Date(date).toLocaleDateString("en-GB");

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

  // Fetch bookings from DB when component loads or date changes
  useEffect(() => {
    debugger
    async function fetchBookings() {
      try {
        const response = await axios.get(
          `http://localhost:4000/getallbookings?bookedDate=${currentDate}`
        );
        const bookings = response.data.bookings;

        // Map bookings into { D1: {...}, D2: {...} } format
        const bookingsMap = {};
        bookings.forEach((booking) => {
          bookingsMap[booking.tableNo] = {
            booked: true,
            prName: booking.prName,
          };
        });

        setBookedTables(bookingsMap);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, [currentDate]);

  // Handle table button click
  function handleTableClick(event) {
    const tableId = event.target.getAttribute("data-table");
    setValue("tableId", tableId);
  }

  // Handle form submission
  async function onSubmit(data) {
    const payload = {
      tableNo: data.tableId,
      guestName: data.guestName,
      guestQuantity: data.guestQuantity,
      prName: loggedInUser.name,
      bookedDate: currentDate,
      currDate: new Date().toLocaleString("en-GB"),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/create-booking",
        payload
      );

      if (response.data.success) {
        toast.success("Booking successful!");
        document.getElementById("closeModal").click();
        reset();

        // Refetch bookings to update UI
        const updatedResponse = await axios.get(
          `http://localhost:4000/get-bookings?bookedDate=${currentDate}`
        );
        const bookings = updatedResponse.data.bookings;

        const bookingsMap = {};
        bookings.forEach((booking) => {
          bookingsMap[booking.tableNo] = {
            booked: true,
            prName: booking.prName,
          };
        });

        setBookedTables(bookingsMap);
      } else {
        toast.error(response.data.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      toast.error("Error while booking, please try again.");
    }
  }

  const consoleTables = ["D1", "D2", "D3", "D4"];

  return (
    <section>
      <div className="container-fluid border border-dark py-5">
        <h1 className="text-center fw-bold">01 - Section Console </h1>
        <h2 className="text-center">Table Booking for {currentDate}</h2>

        <div className="row text-center justify-content-center">
          {consoleTables.map((table) => (
            <div key={table} className="col border border-dark py-3">
              {bookedTables[table]?.booked ? (
                <button className="btn btn-secondary" disabled>
                  Sold : {table}
                  <br />
                  {bookedTables[table].prName}
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
          ))}
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
      </div>
    </section>
  );
}

export default Console;

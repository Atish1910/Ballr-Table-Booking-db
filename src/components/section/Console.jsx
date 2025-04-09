// Import necessary React hooks and libraries
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function Console() {
  const { date } = useParams();
  const currentDate = new Date(date).toLocaleDateString("en-GB");
  
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm();

  const [bookedTables, setBookedTables] = useState(() => {
    return JSON.parse(localStorage.getItem(`bookings_${date}`)) || {};
  });

  useEffect(() => {
    setBookedTables(JSON.parse(localStorage.getItem(`bookings_${date}`)) || {});
  }, [date]);

  function handleTableClick(event) {
    const tableId = event.target.getAttribute("data-table");
    setValue("tableId", tableId);
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "N/A" };

  async function onSubmit(data) {
    debugger
    await new Promise((res) => setTimeout(res, 1000));
    
    const updatedBookings = { 
      ...bookedTables, 
      [data.tableId]: { 
        booked: true, 
        fullName: data.fullName, 
        quantity: data.quantity,
        bookedBy: loggedInUser.name, // Store only PR Name
        currDate: new Date().toLocaleString("en-GB") // formatted date & time string
      } 
    };
    
    localStorage.setItem(`bookings_${date}`, JSON.stringify(updatedBookings));
    setBookedTables(updatedBookings);
    
    document.getElementById("closeModal").click();
    reset();
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
                  Sold : {table} <br /> {bookedTables[table].bookedBy}
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

        <div className="modal fade" id="bookingModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Enter Guest Details</h1>
                <button type="button" id="closeModal" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)} className="form-control py-3 border border-dark">
                  <input type="hidden" {...register("tableId")} />
                  <input 
                    type="text" 
                    placeholder="Enter Guest Name" 
                    className={`mb-3 form-control ${errors.fullName ? "input-errors" : ""}`} 
                    {...register("fullName", { required: true })} 
                  />
                  <input 
                    type="number" 
                    placeholder="Enter Guest Quantity" 
                    className={`mb-3 form-control ${errors.quantity ? "input-errors" : ""}`} 
                    {...register("quantity", { required: true })} 
                  />
                  <button className="btn btn-success" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Please Wait" : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-center">Booking Details</h3>
          {Object.keys(bookedTables).length > 0 ? (
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Table</th>
                  <th>PR Name</th>
                  <th>Guest Name</th>
                  <th>Guest Quantity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(bookedTables).map(([tableId, booking]) => (
                  <tr key={tableId}>
                    <td>{tableId}</td>
                    <td>{booking.bookedBy}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.quantity}</td>
                    <td>{booking.currDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No bookings yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Console;

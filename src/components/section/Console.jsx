// Import necessary React hooks and libraries
import {
  useState,
  useEffect
} from "react";
import {
  useParams
} from "react-router-dom";
import {
  useForm
} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionTwoE from "./SectionTwoE";
import SectionTwoE2 from "./SectionTwoE2";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFiveS from "./SectionFiveS";
import SectionFiveK1 from "./SectionFiveK1";
import SectionFiveK2 from "./SectionFiveK2";

function Console() {
  
  // const url = process.env.REACT_BASE_URL;
  const {
    date
  } = useParams();
  const currentDate = new Date(date).toLocaleDateString("en-GB");
  const [bookings, setBookings] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {
      errors,
      isSubmitting
    },
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
    try {
      const res = await axios.get(`https://ballr-mern-ashish.onrender.com/getallbookings`);
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
      const response = await axios.post(`https://ballr-mern-ashish.onrender.com/create-booking`, bookedTables);

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
      return; // exit if user cancels
    }
    try {
      const response = await axios.delete(`https://ballr-mern-ashish.onrender.com/delete-booking/${bookingId}`);

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

  const sectionOne = ["D1", "D2", "D3", "D4", "D5", "D6"];
  // const sectionTwo = ["T7", "T8","T9","T10"];
  const sectionThree =  ["T1", "T2","T3","T4","T5","T6"];
  const sectionFour = ["S1", "S2","S3","S4","S5","S6"];
  const sectionFiveS = ["S7","S8","S9","S10"];

  return (
<>
  <section className="section-01 border border-dark position-relative">
    <div className="container  py-5">
      <div className="row border justify-content-center align-items-center position-relative">
        <div className="col-2 col-lg-2">
          <SectionThree bookings={bookings} handleTableClick={handleTableClick} sectionArray={sectionThree} />
          <div className="row py-5 text-center">
            <div className="">
              <h3 className="text-gold">BAR</h3>
            </div>
          </div>
          <SectionFour bookings={bookings} handleTableClick={handleTableClick} sectionArray={sectionFour} />

        </div>
        <div className="col-7  col-lg-8 border">
          <div className="row">
            <div className="col-11">
              <SectionTwo bookings={bookings} handleTableClick={handleTableClick}/>
              <SectionTwoE bookings={bookings} handleTableClick={handleTableClick}></SectionTwoE>
              <SectionTwoE2 bookings={bookings} handleTableClick={handleTableClick}> </SectionTwoE2>
            </div>
            
          </div>
          <div className="row middle-section" ></div>
          <div className="row">
            <SectionFiveK2 bookings={bookings} handleTableClick={handleTableClick}></SectionFiveK2>
            <SectionFiveK1 bookings={bookings} handleTableClick={handleTableClick}></SectionFiveK1>
            <SectionFiveS bookings={bookings} handleTableClick={handleTableClick}></SectionFiveS>
          </div>
        </div>
        <div className="col-3  col-lg-2">
        <div className=" text-center border entry-gate">
            <i class="bi bi-door-open-fill  text-gold h6"></i>
              <h6 className="text-gold">Entry Gate Of Ballr</h6>
              <i class="bi bi-arrow-return-right text-gold h6"></i>
            </div>
          <SectionOne bookings={bookings} handleTableClick={handleTableClick} sectionArray={sectionOne} />
        </div>
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

                <input type="text" placeholder="Enter Guest Name" className={`mb-3 form-control ${ errors.guestName
                  ? "input-errors" : "" }`} {...register("guestName", { required: true })} />
                {errors.guestName && (
                <p className="text-danger">Guest Name is required.</p>
                )}

                <input type="number" placeholder="Enter Guest Quantity" className={`mb-3 form-control ${
                  errors.guestQuantity ? "input-errors" : "" }`} {...register("guestQuantity", { required: true })} />
                {errors.guestQuantity && (
                <p className="text-danger">Guest Quantity is required.</p>
                )}

                <button className="btn btn-success" disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Please Wait" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Booking Details Start */}
  <section>
    <div className="container mt-5 table-responsive px-4 ">
      <h3 className="text-center">Booking Details</h3>
      <table className="table table-bordered text-center table-responsive ">
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
              <button className="btn btn-danger" onClick={()=> handleDeleteBooking(booking._id)}
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
  </section>
</>
);
}

export default Console;
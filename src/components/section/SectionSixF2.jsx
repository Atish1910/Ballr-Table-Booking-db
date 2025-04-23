function SectionSixF2({ bookings, handleTableClick}){
  const tables = ["F12", "F11", "F10", "F9"];

  return (
        <div className="row text-center pt-lg-2 pb-lg-4 py-2">
          {/* Buttons */}
          <div className="col col-20 ">
            {bookings.find((b) => b.tableNo === "F12") ? (
              <button className="btn sold-btn-circle" disabled>F12</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="F12"
                onClick={handleTableClick}
              >
                F12
              </button>
            )}
          </div>

          <div className="col col-20 col-20 ">
            {bookings.find((b) => b.tableNo === "F11") ? (
              <button className="btn sold-btn-circle" disabled>F11</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="F11"
                onClick={handleTableClick}
              >
                F11
              </button>
            )}
          </div>
          <div className="col col-20 d-block ">
            <div className="">
            {bookings.find((b) => b.tableNo === "M1") ? (
              <button className="btn sold-btn py-0" disabled>M1</button>
            ) : (
              <button
                type="button"
                className="btn book-btn py-0"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="M1"
                onClick={handleTableClick}
              >
                M1
              </button>
            )}
            </div>
            <div className="d-flex justify-content-lg-center justify-content-end">
              <div className="m-table"></div>
            </div>
            <div className=""> 

           
            {bookings.find((b) => b.tableNo === "M2") ? (
              <button className="btn sold-btn  py-0" disabled>M2</button>
            ) : (
              <button
                type="button"
                className="btn book-btn py-0"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="M2"
                onClick={handleTableClick}
              >
                M2
              </button>
            )}
             </div>
          </div>

          <div className="col col-20 col-20 ">
            {bookings.find((b) => b.tableNo === "F10") ? (
              <button className="btn sold-btn-circle" disabled>F10</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="F10"
                onClick={handleTableClick}
              >
                F10
              </button>
            )}
          </div>

          <div className="col col-20 col-20 ">
            {bookings.find((b) => b.tableNo === "F9") ? (
              <button className="btn sold-btn-circle" disabled>F9</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="F9"
                onClick={handleTableClick}
              >
                F9
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionSixF2;
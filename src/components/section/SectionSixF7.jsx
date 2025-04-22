function SectionSixF7({ bookings, handleTableClick}){

  return (
        <div className="row text-center pt-lg-2 pb-lg-4 py-2">
          <div className="pb-3">
            {bookings.find((b) => b.tableNo === "F21") ? (
              <button className="btn sold-btn-circle-circle" disabled>F21</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle p-2"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="F21"
                onClick={handleTableClick}
              >
                F21
              </button>
            )}
          </div>
          <div className="col col-20 d-block ">
            <div className="">
            {bookings.find((b) => b.tableNo === "M3") ? (
              <button className="btn sold-btn-circle" disabled>M3</button>
            ) : (
              <button
                type="button"
                className="btn book-btn py-0"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="M3"
                onClick={handleTableClick}
              >
                M3
              </button>
            )}
            </div>
            <div className="d-flex justify-content-lg-center justify-content-end">
              <div className="m-table"></div>
            </div>
            <div className=""> 

           
            {bookings.find((b) => b.tableNo === "M4") ? (
              <button className="btn sold-btn-circle" disabled>M4</button>
            ) : (
              <button
                type="button"
                className="btn book-btn py-0"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="M4"
                onClick={handleTableClick}
              >
                M4
              </button>
            )}
             </div>
          </div>

        </div>
  );
}
export default SectionSixF7;
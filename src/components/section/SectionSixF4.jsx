function SectionSixF4({ bookings, handleTableClick}){
  const tables = ["M5"];

  return (
        <div className="row justify-content-center align-items-center pb-3">
          {/* Buttons */}
          <div className="col-3">
            {bookings.find((b) => b.tableNo === "M5") ? (
              <button className="btn sold-btn-circle-circle" disabled>M5</button>
            ) : (
              <button
                type="button"
                className="btn book-btn-circle p-3 fs-6"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="M5"
                onClick={handleTableClick}
              >
                M5
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionSixF4;
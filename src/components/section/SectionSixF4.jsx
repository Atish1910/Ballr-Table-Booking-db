function SectionSixF4({ bookings, handleTableClick}){
  const tables = ["M5"];

  return (
        <div className="row justify-content-center align-items-center pt-lg-4 py-2 left-02">
          {/* Buttons */}
          <div className="col-3 text-center">
            {bookings.find((b) => b.tableNo === "M5") ? (
              <button className="btn sold-btn-circle  p-3 fs-6" disabled>M5</button>
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
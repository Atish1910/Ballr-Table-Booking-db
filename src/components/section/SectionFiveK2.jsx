function SectionFiveK2({ bookings, handleTableClick}){
  const tables = ["K5", "K6"];

  return (
        <div className="row text-center py-lg-3 align-items-center SectionFivek2">
          {/* Buttons */}
          <div className="col-4  border-dark">
            {bookings.find((b) => b.tableNo === "k5") ? (
              <button className="btn sold-btn" disabled>k5</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="k5"
                onClick={handleTableClick}
              >
                k5
              </button>
            )}
          </div>
          <div className="col-4 py-1 px-2">
            <p className="border-gold pt-1 mb-0"></p>
            <p className="border-gold pt-1 mb-0"></p>
            <p className="border-gold pt-1 mb-0"></p>
            <p className="border-gold pt-1 mb-0"></p>
            <p className="border-gold pt-1 mb-0"></p>
            <p className="border-gold pt-1 mb-0 d-none d-lg-block"></p>
            <p className="border-gold pt-1 mb-0 d-none d-lg-block"></p>
          </div>

          <div className="col-4  border-dark">
            {bookings.find((b) => b.tableNo === "k6") ? (
              <button className="btn sold-btn" disabled>k6</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="k6"
                onClick={handleTableClick}
              >
                k6
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionFiveK2;
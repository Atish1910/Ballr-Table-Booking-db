function SectionTwoE2({ bookings, handleTableClick}){
  const tables = ["E5", "E6", "E7", "E8"];

  return (
        <div className="row text-center pt-lg-2 pb-lg-4 py-2 sectiontwo">
          {/* Buttons */}
          <div className="col col-20 border-dark py-3">
            {bookings.find((b) => b.tableNo === "E5") ? (
              <button className="btn sold-btn" disabled>E5</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E5"
                onClick={handleTableClick}
              >
                E5
              </button>
            )}
          </div>

          <div className="col col-20 col-20 border-dark py-3">
            {bookings.find((b) => b.tableNo === "E6") ? (
              <button className="btn sold-btn" disabled>E6</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E6"
                onClick={handleTableClick}
              >
                E6
              </button>
            )}
          </div>
          <div className="col border">
            <p className="border pt-1 mt-3"></p>
            <p className="border pt-1"></p>
            <p className="border pt-1 d-none d-lg-block"></p>
          </div>

          <div className="col col-20 col-20 border-dark py-3">
            {bookings.find((b) => b.tableNo === "E7") ? (
              <button className="btn sold-btn" disabled>E7</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E7"
                onClick={handleTableClick}
              >
                E7
              </button>
            )}
          </div>

          <div className="col col-20 col-20 border-dark py-3">
            {bookings.find((b) => b.tableNo === "E8") ? (
              <button className="btn sold-btn" disabled>E8</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E8"
                onClick={handleTableClick}
              >
                E8
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionTwoE2;
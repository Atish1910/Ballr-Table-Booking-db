function SectionFiveK1({ bookings, handleTableClick}){
  const tables = ["K1", "K2", "K3", "K4"];

  return (
        <div className="row text-center bg-gold pt-lg-3 pb-lg-5 SectionFiveK1 m-auto">
          {/* Buttons */}
          <div className="col col-20  border-dark py-4">
            {bookings.find((b) => b.tableNo === "K1") ? (
              <button className="btn sold-btn" disabled>K1</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="K1"
                onClick={handleTableClick}
              >
                K1
              </button>
            )}
          </div>

          <div className="col col-20  border-dark py-4">
            {bookings.find((b) => b.tableNo === "K2") ? (
              <button className="btn sold-btn" disabled>K2</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="K2"
                onClick={handleTableClick}
              >
                K2
              </button>
            )}
          </div>
          <div className="col col-20  py-4 border"></div>

          <div className="col col-20 py-4">
            {bookings.find((b) => b.tableNo === "K3") ? (
              <button className="btn sold-btn" disabled>K3</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="K3"
                onClick={handleTableClick}
              >
                K3
              </button>
            )}
          </div>

          <div className="col col-20  border-dark py-4">
            {bookings.find((b) => b.tableNo === "K4") ? (
              <button className="btn sold-btn" disabled>K4</button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="K4"
                onClick={handleTableClick}
              >
                K4
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionFiveK1;
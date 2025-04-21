function SectionTwoE({ bookings, handleTableClick}){
  const tables = ["E1", "E2", "E3", "E4"];

  return (
        <div className="row text-center pt-4 border rounded-3 bg-gold pt-3 pb-5">
          {/* Buttons */}
          <div className="col col-20  border-dark py-3">
            {bookings.find((b) => b.tableNo === "E1") ? (
              <button className="btn sold-btn" disabled>
                Sold : E1<br />{bookings.find((b) => b.tableNo === "E1").prName.split(" ")[0]}
              </button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E1"
                onClick={handleTableClick}
              >
                E1
              </button>
            )}
          </div>

          <div className="col col-20  border-dark py-3">
            {bookings.find((b) => b.tableNo === "E2") ? (
              <button className="btn sold-btn" disabled>
                Sold : E2<br />{bookings.find((b) => b.tableNo === "E2").prName.split(" ")[0]}
              </button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E2"
                onClick={handleTableClick}
              >
                E2
              </button>
            )}
          </div>
          <div className="col col-20  border"></div>

          <div className="col col-20  border-dark py-3">
            {bookings.find((b) => b.tableNo === "E3") ? (
              <button className="btn sold-btn" disabled>
                Sold : E3<br />{bookings.find((b) => b.tableNo === "E3").prName.split(" ")[0]}
              </button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E3"
                onClick={handleTableClick}
              >
                E3
              </button>
            )}
          </div>

          <div className="col col-20  border-dark py-3">
            {bookings.find((b) => b.tableNo === "E4") ? (
              <button className="btn sold-btn" disabled>
                Sold : E4<br />{bookings.find((b) => b.tableNo === "E4").prName.split(" ")[0]}
              </button>
            ) : (
              <button
                type="button"
                className="btn book-btn"
                data-bs-toggle="modal"
                data-bs-target="#bookingModal"
                data-table="E4"
                onClick={handleTableClick}
              >
                E4
              </button>
            )}
          </div>

        </div>
  );
}
export default SectionTwoE
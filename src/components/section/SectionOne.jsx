function SectionOne({ bookings, handleTableClick, sectionArray }) {
  return (
      <div className="row text-lg-end text-center bg-gold py-5 console-01">
        <div className="col-2 d-flex align-items-center justify-content-center">
          <div className=" inner-01">
          <div className="inner-02">
            <h6 className="text-center fw-bold bg-white text-gold border rounded-3 px-3">Console</h6>
          </div>
          </div>
        </div>
        <div className="col-8">
          {sectionArray.map((table) => {
            const isBooked = bookings.find((booking) => booking.tableNo === table);
            return (
              <div key={table} className="border-dark py-3">
                {isBooked ? (
                  <button className="btn sold-btn" disabled>{table}</button>
                ) : (
                  <button
                    type="button"
                    className="btn book-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#bookingModal"
                    data-table={table}
                    onClick={handleTableClick}
                  >
                    {table}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default SectionOne;

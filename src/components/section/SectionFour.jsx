function SectionFour({ bookings, handleTableClick, sectionArray }) {
  return (
    <div className="row text-end bg-gold rounded-3 py-5">
      {sectionArray.map((table) => {
        const isBooked = bookings.find((booking) => booking.tableNo === table);
        return (
          <div key={table} className="border-dark pb-3">
            {isBooked ? (
              <button className="btn sold-btn" disabled>{table}</button>
            //   <button className="btn sold-btn" disabled>
            //   Sold : {table}<br />{isBooked.prName.split(" ")[0]}
            // </button>
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
  );
}

export default SectionFour;

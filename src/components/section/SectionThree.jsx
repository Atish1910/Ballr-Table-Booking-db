function SectionThree({ bookings, handleTableClick }) {
  const sectionThree =  ["T6", "T5","T4","T3","T2","T1"];
  return (
    <div className="row text-end bg-gold py-5 rounded-3">
      {sectionThree.map((table) => {
        const isBooked = bookings.find((booking) => booking.tableNo === table);
        return (
          <div key={table} className="border-dark pb-lg-5 pb-4">
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
  );
}

export default SectionThree;

function SectionSixF3({ bookings, handleTableClick}) {
  const sectionSixF3 = ["F18","F17","F16","F15", "F14"];
    return (
      <>  
        <div className="row text-center pt-lg-4 pt-2 m-auto floor">
          {sectionSixF3.map((table) => {
          // Check if table is already booked in bookings list
          const isBooked = bookings.find((booking) => booking.tableNo === table);
          return (
          <div key={table} className="col-20 border-dark pb-3">
            {isBooked ? (
            <button className="btn sold-btn" disabled>{table}</button>
            ) : (
            <button type="button" className="btn book-btn-circle" data-bs-toggle="modal" data-bs-target="#bookingModal"
              data-table={table} onClick={handleTableClick}>{table}</button>
            )}
          </div>
          );
          })}
        </div>
      </>
    );
    }
    
    export default SectionSixF3;
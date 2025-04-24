function SectionSixF5({ bookings, handleTableClick}) {
  const sectionSixF5 = ["F23","F22","F27","F26", "F31","F30"];
    return (
      <>  
        <div className="row text-center pt-lg-4 pt-2">
          {sectionSixF5.map((table) => {
          // Check if table is already booked in bookings list
          const isBooked = bookings.find((booking) => booking.tableNo === table);
          return (
          <div key={table} className="col-6 border-dark py-lg-3 pb-3">
            {isBooked ? (
            <button className="btn sold-btn-circle" disabled>{table}</button>
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
    
    export default SectionSixF5;
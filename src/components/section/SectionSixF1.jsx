function SectionSixF1({ bookings, handleTableClick}) {
  const sectionFiveS = ["F4","F3","F2","F1", "F8","F7", "F6","F5"];
    return (
      <>  
        <div className="row text-center pt-lg-4 pt-2 position-relative left-15 ">
          {sectionFiveS.map((table) => {
          // Check if table is already booked in bookings list
          const isBooked = bookings.find((booking) => booking.tableNo === table);
          return (
          <div key={table} className="col-3 border-dark py-lg-3 pb-3">
            {isBooked ? (
            <button className="btn sold-btn-circle  p-2 py-1" disabled>{table}</button>
            ) : (
            <button type="button" className="btn book-btn-circle p-2 py-1" data-bs-toggle="modal" data-bs-target="#bookingModal"
              data-table={table} onClick={handleTableClick}>{table}</button>
            )}
          </div>
          );
          })}
        </div>
      </>
    );
    }
    
    export default SectionSixF1;
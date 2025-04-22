function SectionFiveS({ bookings, handleTableClick}) {
  const sectionFiveS = ["S7","S8","S9","S10"];
    return (
      <>  
        <div className="row text-center pt-lg-4 pt-2 m-auto">
          {sectionFiveS.map((table) => {
          // Check if table is already booked in bookings list
          const isBooked = bookings.find((booking) => booking.tableNo === table);
          return (
          <div key={table} className="col-lg-3 col-25 border-dark py-3">
            {isBooked ? (
            <button className="btn sold-btn" disabled>{table}</button>
            ) : (
            <button type="button" className="btn book-btn" data-bs-toggle="modal" data-bs-target="#bookingModal"
              data-table={table} onClick={handleTableClick}>{table}</button>
            )}
          </div>
          );
          })}
        </div>
      </>
    );
    }
    
    export default SectionFiveS;
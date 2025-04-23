function SectionSixF6({ bookings, handleTableClick}) {
  const sectionSixF6 = ["F20","F19","F25","F24", "F29","F28"];
    return (
      <>  
        <div className="row text-center pt-lg-4 pt-2 m-auto">
          {sectionSixF6.map((table) => {
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
    
    export default SectionSixF6;
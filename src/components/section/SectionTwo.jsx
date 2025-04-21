function SectionTwo({ bookings, handleTableClick, sectionArray }) {
return (
  <>  
    <div className="row text-center pt-4  border rounded-3">
      <h6 className="text-center fw-bold ">Expensive VIP Section</h6>
      {sectionArray.map((table) => {
      // Check if table is already booked in bookings list
      const isBooked = bookings.find((booking) => booking.tableNo === table);
      return (
      <div key={table} className="col-lg-3 col-25 border-dark py-3">
        {isBooked ? (
        <button className="btn sold-btn" disabled>Sold : {table}<br />{isBooked.prName.split(" ")[0]}</button>
        ) : (
        <button type="button" className="btn book-btn-02" data-bs-toggle="modal" data-bs-target="#bookingModal"
          data-table={table} onClick={handleTableClick}>{table}</button>
        )}
      </div>
      );
      })}
    </div>
  </>
);
}

export default SectionTwo;
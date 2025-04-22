function SectionTwo({ bookings, handleTableClick}) {
  const sectionTwo = ["T7", "T8","T9","T10"];
return (
  <>  
    <div className="row text-center pt-lg-4 pt-2  border rounded-3">
      <h6 className="text-center fw-bold ">Expensive VIP Section</h6>
      {sectionTwo.map((table) => {
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

export default SectionTwo;
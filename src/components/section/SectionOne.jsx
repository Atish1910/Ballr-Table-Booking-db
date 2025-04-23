function SectionOne({ bookings, handleTableClick, sectionArray }) {
return (
<div className="row text-lg-end text-center bg-gold py-5 console-01">
  <div className="col-2 col-lg-6 d-flex align-items-center justify-content-center text-lg-end">
    <div className="d-flex  inner-02">
      <div className="pe-3 mt-lg-3">
        <p className="border px-5 pt-1 mb-0"></p>
        <p className="border px-5 pt-1 mb-0"></p>
        <p className="border px-5 pt-1 mb-0"></p>
      </div>
      <div className="mb-3">
        <h6 className=" fw-bold bg-white text-gold border rounded-3 px-3">Console</h6>
      </div>
      <div className="ps-3 mt-lg-3">
        <p className="border px-5 pt-1 mb-0"></p>
        <p className="border px-5 pt-1 mb-0"></p>
        <p className="border px-5 pt-1 mb-0"></p>
      </div>
    </div>
  </div>
  <div className="col-8 col-lg-6 text-lg-center">
    {sectionArray.map((table) => {
    const isBooked = bookings.find((booking) => booking.tableNo === table);
    return (
    <div key={table} className="border-dark py-3">
      {isBooked ? (
      <button className="btn sold-btn" disabled>{table}</button>
      ) : (
      <button type="button" className="btn book-btn" data-bs-toggle="modal" data-bs-target="#bookingModal"
        data-table={table} onClick={handleTableClick}>
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
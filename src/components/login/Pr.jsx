import { useEffect, useState } from "react";

function Pr() {
  const [prUsers, setPrUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter(user => user.user === "PR"); // Get only PR users
    setPrUsers(filteredUsers);
  }, []);

  const toggleActive = (index) => {
    const isActiveSure = window.confirm("Are you sure you want to Activate/Deactivate this user?");
    if (isActiveSure) {
      const updatedUsers = [...prUsers];
      updatedUsers[index].isActivate = !updatedUsers[index].isActivate; // Toggle isActivate

      // Update all users in localStorage
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedAllUsers = allUsers.map(user =>
        user.email === updatedUsers[index].email ? { ...user, isActivate: updatedUsers[index].isActivate } : user
      );

      localStorage.setItem("users", JSON.stringify(updatedAllUsers));
      setPrUsers(updatedUsers); // Update state with the modified users
    }
  };
  

  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        View PR Details
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">All PR Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>PR Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Activate User</th>
                  </tr>
                </thead>
                <tbody>
                  {prUsers.length > 0 ? (
                    prUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={user.isActivate || false} // Ensure it defaults to false
                            onChange={() => toggleActive(index)} // Toggle state on click
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No PR Users Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pr;

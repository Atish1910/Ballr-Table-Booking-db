import { useEffect, useState } from "react";
import axios from "axios";

function Pr() {
  const [prUsers, setPrUsers] = useState([]);

  useEffect(() => {
    fetchPRUsers();
  }, []);

  const fetchPRUsers = async () => {
    debugger
    try {
      const response = await axios.get("https://ballr-wpc0.onrender.com/api/v1/getalluser");
      const allUsers = response.data;
      const filteredUsers = allUsers.filter(user => user.accountType === "Pr");
      setPrUsers(filteredUsers);
    } catch (err) {
      console.error("Failed to fetch PR users:", err);
    }
  };

  const toggleActive = async (index) => {
    const isActiveSure = window.confirm("Are you sure you want to Activate/Deactivate this user?");
    if (!isActiveSure) return;

    const userToUpdate = prUsers[index];
    const updatedStatus = !userToUpdate.isActive;

    try {
      await axios.put(`https://ballr-wpc0.onrender.com/api/v1/getalluser/${userToUpdate._id}`, {
        isActive: updatedStatus
      });

      // Refresh data after successful update
      fetchPRUsers();
    } catch (err) {
      console.error("Failed to update activation status:", err);
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
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={user.isActive || false}
                            onChange={() => toggleActive(index)}
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

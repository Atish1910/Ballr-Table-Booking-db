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
      const response = await axios.get("http://localhost:4000/api/v1/getalluser", {
        withCredentials: true,
      });

      const allUsers = response.data.data;
      const prOnly = allUsers.filter((user) => user.custId == "" );
      setPrUsers(prOnly);
    } catch (err) {
      console.error("Failed to fetch PR users:", err);
    }
  };

  const toggleActiveStatus = async (index) => {
    const user = prUsers[index];
    const updatedStatus = !user.isActive;

    const confirmChange = window.confirm(
      `Are you sure you want to ${updatedStatus ? "activate" : "deactivate"} this user?`
    );
    if (!confirmChange) return;

    try {
      await axios.post(
        "https://ballr-wpc0.onrender.com/api/v1/signup",
        {
          prId: user._id,
          isActive: updatedStatus,
        },
        {
          withCredentials: true, // ✅ Important to include auth cookies
        }
      );

      // ✅ Update local state directly
      const updatedUsers = [...prUsers];
      updatedUsers[index].isActive = updatedStatus;
      setPrUsers(updatedUsers);
    } catch (err) {
      console.error("Failed to update activation status:", err.response?.data || err.message);
      alert("Failed to update user status");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        View PR Details
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                All PR Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contactNumber}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={user.isActive || false}
                            onChange={() => toggleActiveStatus(index)}
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

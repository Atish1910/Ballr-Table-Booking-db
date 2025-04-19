import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Pr() {
  const [prUsers, setPrUsers] = useState([]);

  useEffect(() => {
    fetchPRUsers();
  }, []);

  // get api
  const fetchPRUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getallusers", {
      });
  
      const allUsers = response.data.data;
      console.log("Fetched users:", allUsers);  // 🔍 Debug log
  
      if (Array.isArray(allUsers)) {
        const prOnly = allUsers.filter((user) => user.accountType === "Pr");
        setPrUsers(prOnly);
      } else {
        console.error("Data format issue: not an array");
      }
  
    } catch (err) {
      console.error("Failed to fetch PR users:", err);
    }
  };

  // update isActive Put Api

  const handleStatusChange = async (userId, newStatus) => {
    const confirmDelete = window.confirm(`Are you sure you want to Activate/De-Activate this User`);
    if (!confirmDelete) {
      return;  // exit if user cancels
    }

    try {
      const response = await axios.put(`http://localhost:4000/update-status/${userId}`,
        { isActive: newStatus },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
        }
      );
  
      if (response.data.success) {
        fetchPRUsers();
        toast.success("Status updated!");
      } else {
        toast.error(response.data.message);
      }
  
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Could not update status. Please try again.");
    }
  };
  
  //Delete User From DB
  const handleDeleteUser = async (userId) => {
    debugger
    try {
      const response = await axios.delete(`http://localhost:4000/delete-user/${userId}`);
  
      if (response.data.success) {
        toast.success("User deleted successfully!");
        // optionally re-fetch users or update UI
      } else {
        toast.error(response.data.message);
      }
  
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Could not delete user. Please try again.");
    }
  };
  
  

  return (
<>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">View Pr</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
  <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            All PR Details
          </h1>
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
                {/* <th>Delete User</th> */}
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
                    checked={user.isActive}
                    onChange={(e) => handleStatusChange(user._id, e.target.checked)}
                  />
                </td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              ))
              ) : (
              <tr>
                <td colSpan="5">Api Fetch  Error </td>
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
import { useEffect, useState } from "react";
import axios from "axios";

function Pr() {
  const [prUsers, setPrUsers] = useState([]);

  useEffect(() => {
    fetchPRUsers();
  }, []);

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
  

  

  return (
<>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    View PR Details
  </button>

  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                  <input type="checkbox" className="form-check-input"/>
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
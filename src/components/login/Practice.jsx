import axios from 'axios';
import React, { useState } from 'react';

const Practice = () => {
  /// Get API Call
  const [userData, setUserData] = useState([]);

  const getUsers = async () => {
    debugger
    try {
      const res = await axios.get("http://localhost:4000/api/v1/getalluser");
      setUserData(res.data.data);
    } catch (error) {
      alert(error);
    }
  };

  /// Add / Update Active Status API
  const toggleActiveStatus = async (userId, currentStatus) => {
    try {
      await axios.post("http://localhost:4000/api/v1/updateisactive", {
        userId: userId,
        isActive: !currentStatus,
      });
      getUsers();
    } catch (error) {
      alert("Failed to update active status");
    }
  };

  return (
    <section>
      <div className="container border mt-5">
        <div className="row p-5">
          <h1 className="mb-4">User Management : Call GET & Update Active Status</h1>

          <div className="col-lg-12">
            <div className="row py-3 mb-2 border border-dark">
              <div className="col-lg-6 text-start">
                <h5>Get Users</h5>
              </div>
              <div className="col-lg-6 text-end">
                <button className="btn btn-primary" onClick={getUsers}>
                  Load Users
                </button>
              </div>
            </div>

            <div className="row">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Account Type</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.contactNumber}</td>
                      <td>{user.accountType}</td>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={user.isActive}
                          onChange={() => toggleActiveStatus(user._id, user.isActive)}
                        />
                      </td>
                    </tr>
                  ))}
                  {userData.length === 0 && (
                    <tr>
                      <td colSpan="6">No Users Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Practice;

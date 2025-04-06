import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Register() {

  const [userData, setUserData] = useState([]);
    const getUsers = async () => {
        try {
            const res = await axios.get("https://ballr-wpc0.onrender.com/api/v1/signup");
            setUserData(res.data.data);
            

        } catch (error) { 
            alert(error);
        }
    }

  const navigate = useNavigate();

  // ⬇️ State to hold registered users
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onRegistration(data) {
    const newUser = {
      ...data,
      isActivate: data.accountType === "Pr" ? false : true,
    };
  
    try {
      const response = await axios.post("https://ballr-wpc0.onrender.com/api/v1/signup", newUser);
  
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful");
        getUsers();
  
        // ⬇️ Add to table
        setRegisteredUsers((prev) => [...prev, newUser]);
  
        // Optional: reset form or redirect
        // reset(); // from useForm
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Server error. Please try again later.";
      toast.error(errorMessage);
    }
  }
  
  

  return (
    <>
      <section className="login_01">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h1>Welcome to Ballr Registration PR/Admin Application</h1>
            <div className="col-lg-6 border mt-3 py-3">
              <form onSubmit={handleSubmit(onRegistration)}>
                {/* Full Name */}
                <input
                  type="text"
                  className={`mb-3 form-control ${errors.name ? "input-errors" : ""}`}
                  placeholder="Enter Full Name"
                  {...register("name", { required: "Full Name is required" })}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}

                {/* Phone Number */}
                <input
                  type="number"
                  className={`mb-3 form-control ${errors.contactNumber ? "input-errors" : ""}`}
                  placeholder="Enter Phone No"
                  {...register("contactNumber", { required: "Phone number is required" })}
                />
                {errors.contactNumber && <p className="text-danger">{errors.contactNumber.message}</p>}
                
                {/* Email */}
                <input
                  type="email"
                  className={`mb-3 form-control ${errors.email ? "input-errors" : ""}`}
                  placeholder="Enter Email Id"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                {/* Password */}
                <input
                  type="password"
                  className={`mb-3 form-control ${errors.password ? "input-errors" : ""}`}
                  placeholder="Enter Password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                {/* User Type */}
                <select
                  className="form-select mb-3"
                  {...register("accountType", { required: "Please select a accountType type" })}
                >
                  <option value="" disabled selected>Please Select Option</option>
                  <option value="Pr">PR</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.accountType && <p className="text-danger">{errors.accountType.message}</p>}

                {/* Submit Button */}
                <div className="">
                  <button className="btn btn-success" type="submit">{isSubmitting ? "Please Wait..." : "Submit"}</button>
                  <p className="mb-0 py-2 text-white">Already Have Account?</p>
                  <button className="btn btn-primary" onClick={() => navigate("/")}>login</button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-borderd">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone</th>
                    <th>Password</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">No users registered yet.</td>
                    </tr>
                  ) : (
                    userData.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.password}</td>
                        <td>{user.accountType}</td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;

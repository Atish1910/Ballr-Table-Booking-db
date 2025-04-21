import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onRegistration(data) {
    debugger
    const newUser = {
      ...data,
      isActive: data.accountType == "Pr" ? false : true,
    };

    console.log("Registering user:", newUser); // ✅ for debugging

    try { // https://ballr-mern-ashish.onrender.com
      const response = await axios.post("https://ballr-mern-ashish.onrender.com/register",newUser);

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful");
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Server error. Please try again later.";
      toast.error(errorMessage);
    }
  }

  return (
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
                defaultValue=""
                {...register("accountType", { required: "Please select an account type" })}
              >
                <option value="" disabled>
                  Please Select Option
                </option>
                <option value="Pr">PR</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.accountType && (
                <p className="text-danger">{errors.accountType.message}</p>
              )}

              {/* Submit Button */}
              <div className="">
                <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Please Wait..." : "Submit"}
                </button>
                <p className="mb-0 py-2 text-white">Already Have Account?</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;

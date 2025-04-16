import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login({ setIsLoggedIn, setLoggedInUser }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onLogin(data) {
    debugger
    try {
      // Send login data to API
      const response = await axios.post("http://localhost:4000/login", data);

      if (response.status === 200) {
        const user = response.data.user;
        console.log(response);

        if (!user.isActive) {
          toast.error("Contact Administration to activate your account.");
          return;
        }

        toast.success("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
        setLoggedInUser(user);
        navigate("/");
      } else {
        toast.error(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Server error. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <section className="login_01">
      <div className="container">
        <div className="row justify-content-center text-center">
          <h1>Login to Ballr</h1>
          <div className="col-lg-6 border mt-3 py-3">
            <form onSubmit={handleSubmit(onLogin)}>
              {/* Email */}
              <input
                type="email"
                className={`mb-3 form-control ${errors.email ? "input-errors" : ""}`}
                placeholder="Enter Email"
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

              {/* Submit Button */}
              <div className="">
                <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <p className="mb-0 py-2 text-white">Don’t have an account?</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

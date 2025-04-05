import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setLoggedInUser }) {
    const navigate = useNavigate();
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    function onLogin(data) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    
        const userExists = storedUsers.find(user => user.phone === data.phoneNo && user.password === data.password);
        const userPhone = storedUsers.find(user => user.phone === data.phoneNo);
    
        if (userExists) {
            if (userExists.isActivate === false) {
                toast.error("Contact Administration to activate your account");
                return;
            }
    
            toast.success("Login Successful!");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInUser", JSON.stringify(userExists));
            setIsLoggedIn(true);
            setLoggedInUser(userExists);
            navigate("/");
        } else {
            if (!userPhone) {
                toast.error("Your Phone No is not registered. Please register your phone number.");
            } else {
                toast.error("You entered the wrong password.");
            }
        }
    }
    

    return (
        <section className="login_01">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <h1>Ballr - Welcome to Ballr PR/Admin Application</h1>
                    <div className="col-lg-6 border rounded-3 py-4">
                        <form onSubmit={handleSubmit(onLogin)}>
                            <input 
                                type="number" 
                                className={`form-control mb-3 ${errors.phoneNo ? "input-errors" : ""}`} 
                                placeholder="Enter Phone Number"
                                {...register("phoneNo", {
                                    required: "Phone Number is required",
                                    minLength: { value: 10, message: "Please enter a 10-digit Mobile Number" },
                                    maxLength: { value: 10, message: "Please enter a 10-digit Mobile Number" }
                                })}
                            />
                            {errors.phoneNo && <p className="text-danger">{errors.phoneNo.message}</p>}

                            <input 
                                type="password" 
                                className={`form-control mb-3 ${errors.password ? "input-errors" : ""}`} 
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}

                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                    {isSubmitting ? "Please Wait..." : "Login"}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-3">
                            <p>Don't have an account?</p>
                            <button className="btn btn-primary" onClick={() => navigate("/register")}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;

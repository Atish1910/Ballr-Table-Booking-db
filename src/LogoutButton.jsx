import { useNavigate } from "react-router-dom";

function LogoutButton({ setIsLoggedIn, setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(`Are You Sure You Want To Logout`);
    if (!confirmLogout) {
      return;  // exit if user cancels
    }
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    navigate("/"); // 👈 Redirect to login
  };

  return (
    <div className="text-center">
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;

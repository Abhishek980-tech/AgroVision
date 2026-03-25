import "../styles/navbar.css";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



/* ✅ MAIN NAVBAR */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  // ✅ Sync state when localStorage changes
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setProfilePic(localStorage.getItem("profilePic"));
    };

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePic");
    setUser(null);
    setProfilePic(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* ✅ LEFT: LOGO */}
      <div className="nav-left">
        <img src={logo} alt="logo" className="logo-img" />
        <h2 className="logo-text">LeafVision</h2>
      </div>

      {/* ✅ CENTER LINKS */}
      {user && (
        <div className="nav-center">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            📈 Dashboard
          </Link>
          <Link to="/detect" className={isActive("/detect")}>
            🧪 Detect Disease
          </Link>
          <Link to="/community" className={isActive("/community")}>
            👥 Community
          </Link>
          <Link to="/bot" className={isActive("/bot")}>
            🤖 AgriCure Bot
          </Link>
        </div>
      )}

      {/* ✅ RIGHT SIDE */}
      <div className="nav-right">
        

        {!user && (
          <>
            <Link to="/signin" className="auth-small">Sign In</Link>
            <Link to="/register" className="auth-small">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" className="avatar-circle">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="navbar-avatar-img"
                />
              ) : (
                <>
                  {user.name?.charAt(0)}
                  {user.name?.charAt(1)}
                </>
              )}
            </Link>

            <button className="logout-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  //logout user on clicking it

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#001a33", padding: "10px 0" }}
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ backgroundColor: "#fff", borderRadius: "2px" }}
          />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink
            to="/"
            className="navbar-brand"
            style={{
              color: "#ffd700", // gold
              fontSize: "24px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Snap Shop
          </NavLink>

          <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={{
                  color: "#fff",
                  margin: "0 15px",
                  textDecoration: "none",
                }}
              >
                Home
              </NavLink>
            </li>

            {/* conditional redering ,if auth.user then 
            register and login ,and if not
            then logout */}
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={{
                      color: "#fff",
                      margin: "0 15px",
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{
                      color: "#fff",
                      margin: "0 15px",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="nav-link"
                    style={{
                      color: "#fff",
                      margin: "0 15px",
                      textDecoration: "none",
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link"
                style={{
                  color: "#fff",
                  margin: "0 15px",
                  textDecoration: "none",
                }}
              >
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category"
                className="nav-link"
                style={{
                  color: "#fff",
                  margin: "0 15px",
                  textDecoration: "none",
                }}
              >
                Category
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

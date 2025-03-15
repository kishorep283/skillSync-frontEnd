import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
// import "../../styles/DashboardNav.css"; // Import the CSS file
import "../../../STYLES/DashBoardNavbas.scss"
const DashBoard_nav = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="nav-links">
        <Link to="/DashBoard/mentors">
          <img src={logo} alt="Logo" width={90} height={90} />
        </Link>
        <Link
          to="/DashBoard/mentors"
          className={`nav-link ${location.pathname.includes("/mentors") ? "active" : ""}`}
        >
          Mentors
        </Link>
        <Link
          to="/DashBoard/connections"
          className={`nav-link ${location.pathname.includes("/Requests") ? "active" : ""}`}
        >
          Connections
        </Link>
        <Link
          to="/DashBoard/profile"
          className={`nav-link ${location.pathname.includes("/profile") ? "active" : ""}`}
        >
          Profile
        </Link>
      </div>

      <div className="nav-buttons">
        <Link to="/mentor/browse">
          <button className="btn btn-primary">Browse Mentors</button>
        </Link>
        <Link to="/">
          <button className="btn btn-danger" onClick={() => sessionStorage.clear()}>
            Log Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashBoard_nav;

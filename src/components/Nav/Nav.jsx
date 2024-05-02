import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
//npm install @fontsource/special-elite required
import "@fontsource/special-elite";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
        <h2 className="nav-title">Bunnycup Winery</h2>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              User
            </Link>

            <Link className="navLink" to="/register-new">
              Add New
            </Link>

            <Link className="navLink" to="/update">
              Update Retailer
            </Link>

            <Link className="navLink" to="/orderSummary">
              Order Summary
            </Link>

            <Link className="navLink" to="/orderHistory">
              Order History
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

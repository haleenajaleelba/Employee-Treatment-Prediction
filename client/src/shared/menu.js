import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/logo.png";

export default function menu() {
  return (
    <nav
    className="navbar navbar-expand-sm navbar-light bg-white shadow-sm sticky-top"
      style={{ height: "70px" }}
    >
      <NavLink
        className="navbar-brand text-light"
        to="/"
        style={{ margin: "0px", padding: "0px" }}
      >
        <img
          src={logo}
          alt="FreshMinds"
          style={{ width: "60px", height: "60px" }}
        />
      </NavLink>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link text-info m-xs font-weight-bold"
              to="/knowyourstatus"
              style={{ padding: "12px" }}
            >
              Registration
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-light m-xs"
              to="/login"
              style={{ minHeight: "50px" }}
            >
              <svg
                height="20pt"
                viewBox="0 -32 512 512"
                width="20pt"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: "rgb(63,187,192)" }}
              >
                <path d="m298.667969 106.667969c0 58.910156-47.757813 106.664062-106.667969 106.664062s-106.667969-47.753906-106.667969-106.664062c0-58.910157 47.757813-106.667969 106.667969-106.667969s106.667969 47.757812 106.667969 106.667969zm0 0" />
                <path d="m282.667969 256h-181.335938c-55.871093 0-101.332031 45.460938-101.332031 101.332031v74.667969c0 8.832031 7.167969 16 16 16h352c8.832031 0 16-7.167969 16-16v-74.667969c0-55.871093-45.460938-101.332031-101.332031-101.332031zm0 0" />
                <path d="m506.902344 180.265625-74.667969-69.332031c-3.007813-2.796875-6.933594-4.246094-10.878906-4.246094-10.582031 0-16.023438 9.003906-16.023438 15.980469v48h-85.332031c-11.796875 0-21.332031 9.554687-21.332031 21.332031s9.535156 21.332031 21.332031 21.332031h85.332031v48c0 8.875 7.210938 16 16 16 3.96875 0 7.875-1.46875 10.902344-4.265625l74.667969-69.332031c3.242187-3.03125 5.097656-7.296875 5.097656-11.734375s-1.855469-8.703125-5.097656-11.734375zm0 0" />
              </svg>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

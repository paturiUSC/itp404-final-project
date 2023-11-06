import { NavLink } from "react-router-dom";
import React from "react"; 
import "../CSS/NavBar.css"

export default function Navigation() {

    return (
        <nav className="navbar navbar-expand-lg mb-2 custom-font">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand custom-main-button">
              UniNest
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/listings" className="nav-link">
                    Listings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/bookmarks" className="nav-link">
                    Bookmarks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/writeReview" className="nav-link">
                    Write a Review
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );

}
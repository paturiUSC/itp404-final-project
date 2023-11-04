import { NavLink } from "react-router-dom";
import React from "react"; 
import "../CSS/NavBar.css"

export default function Navigation() {

    const activeStyle = {
        color: 'red'
      };

    return (
        <nav className="navbar navbar-expand-lg mb-5" style={{"borderBottom": "1px solid #F0F0F0"}}>
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand custom-main-button">
              UniNest
            </NavLink>
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
              </ul>
            </div>
          </div>
        </nav>
      );

}
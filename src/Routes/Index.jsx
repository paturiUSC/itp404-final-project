import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/IndexButtons.css";

export default function Index() {
  useEffect(() => {
    document.title = `UniNest: Home Page (Select An Action)`;
  }, []);

  return (
    <div className="custom-font">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-grid gap-2 col-lg-6 col-sm-12 mx-auto d-block">
          <NavLink
            className="btn btn-dark btn-lg py-5 custom-bg-button"
            to="/listings"
          >
            View Listings
          </NavLink>

          <NavLink
            className="btn btn-dark btn-lg py-5 custom-bg-button"
            to="/bookmarks"
          >
            View Bookmarked Listings
          </NavLink>

          <NavLink
            className="btn btn-dark btn-lg py-5 custom-bg-button"
            to="/writeReview"
          >
            Write a Review
          </NavLink>

          <NavLink
            className="btn btn-dark btn-lg py-5 custom-bg-button mb-2"
            to="/admin"
          >
            Admin
          </NavLink>
        </div>
      </div>
    </div>
  );
}

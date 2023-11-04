import { Link } from "react-router-dom";

export default function Navigation() {

    return (
        <nav className="navbar navbar-expand-lg bg-light mb-2">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              UniNest
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/listings" className="nav-link">
                    Listings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bookmarks" className="nav-link">
                    Bookmarks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/writeReview" className="nav-link">
                    Write a Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );

}
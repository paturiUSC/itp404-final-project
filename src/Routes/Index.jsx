import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import '../CSS/IndexButtons.css';

export default function Index()
{
    return (
        <div className="custom-font">
            <div className="container d-flex justify-content-center align-items-center" style={{height: "75vh"}}>
                <div className="d-grid gap-2 col-lg-6 col-sm-12 mx-auto d-block mt-5">
                    <NavLink className="btn btn-dark btn-lg py-5 custom-bg-button" to="/listings">View Listings</NavLink>

                    <NavLink className="btn btn-dark btn-lg py-5 custom-bg-button" to="/bookmarks">View Bookmarked Listings</NavLink>

                    <NavLink className="btn btn-dark btn-lg py-5 custom-bg-button" to="/writeReview">Write a Review</NavLink>

                    <NavLink className="btn btn-dark btn-lg py-5 custom-bg-button" to="/admin">Admin</NavLink>
                </div>
            </div>
        </div>
    );
}
import { Link } from "react-router-dom";
import "../CSS/ListingPreview.css";
import { BookmarkFill, Bookmark } from "react-bootstrap-icons";
import { useState } from "react";
import { splitAddress } from "../widelyUsedFunctions";

export default function ListingPreview(props) {
  const [bookmark, setBookmarked] = useState(props.bookmarked);

  return (
    <div className="mt-4 col-sm-12 col-md-6 col-lg-4">
      <div className="card fixed-card">
        <Link
          to={`/listings/${props.id}`}
          className="custom-preview-decoration"
        >
          <img
            src={props.propertyImg}
            className="card-img-top fixed-image"
            alt="Listing Image"
          />
          <div className="card-body d-flex flex-column first-body">
            <div className="d-flex justify-content-between">
              <div>
                <p className="card-title custom-link">
                  {splitAddress(props.address)[0]}
                </p>
                <p className="card-title custom-link">
                  {splitAddress(props.address)[1]}
                </p>
              </div>
              <p className="card-title custom-link other-description">
                <span className="other-description-info">${props.rent}</span>
              </p>
            </div>
            <p className="card-text other-description">
              Distance From Village:{" "}
              <span className="other-description-info">
                {props.distance} mi
              </span>
            </p>
          </div>
        </Link>
        <div className="second-body card-body d-flex justify-content-between align-items-center">
          <div>
            <p className="card-text other-description ">
              Bed:{" "}
              <span className="other-description-info">{props.bedrooms}</span> |
              Bath:{" "}
              <span className="other-description-info">{props.bathrooms}</span>
            </p>
          </div>
          <button
            type="submit"
            className="btn"
            onClick={() => {
              props.onClick(props.id, bookmark);
              setBookmarked(!bookmark);
            }}
          >
            {bookmark ? <BookmarkFill /> : <Bookmark />}
          </button>
        </div>
      </div>
    </div>
  );
}

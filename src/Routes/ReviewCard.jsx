import { Link } from "react-router-dom";
import "../CSS/ReviewCard.css";
import {
  generateStarIcons,
  convertMillisecondsToReadableDate,
} from "../widelyUsedFunctions";

export default function ReviewCard(props) {
  return (
    <div data-testid="review-card" key={props.id} className="card mt-2 mb-2">
      <div className="card-body">
        <Link to={`/reviews/${props.id}`} className="link-without-underline">
          <div className="row">
            <div className="col-md-6">
              <h4 className="card-title star-icons">
                {generateStarIcons(props.rating)}
              </h4>
            </div>
            <div className="col-md-6 text-md-end">
              <h6 className="card-subtitle mb-2 text-muted">
                {props.reviewerFirstName}
              </h6>
            </div>
          </div>
        </Link>
        <div className="row align-items-center">
          <div className="col-md-6">
            <Link
              to={`/reviews/${props.id}`}
              className="link-without-underline"
            >
              <p className="card-text mt-2 mb-2 review-text-hover">
                {props.reviewText}
              </p>
            </Link>
            <Link
              to={`/reviews/${props.id}`}
              className="link-without-underline"
            >
              <p
                data-testid="review-timestamp"
                className="card-text review-written review-text-hover"
              >
                {convertMillisecondsToReadableDate(props.timestamp)}
              </p>
            </Link>
          </div>
          {props.button ? (
            <div className="col-md-6 text-md-end">
              <button
                data-testid={`review-card-${props.id}-delete`}
                id="delete"
                className="btn btn-secondary btn-color"
                onClick={() => {
                  const deletedReview = props.id;
                  props.onClick(deletedReview);
                }}
              >
                {props.button}
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

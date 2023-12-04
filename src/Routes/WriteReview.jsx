import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InputText from "../InputComponents/InputText";
import "../CSS/WriteReview.css";
import { saveReview } from "../api";
import { ToastContainer, toast } from "react-toastify";
import {
  generateStarIcons,
  convertMillisecondsToReadableDate,
} from "../widelyUsedFunctions";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../InputComponents/SelectInput";
import InputTextArea from "../InputComponents/InputTextArea";
import validateReviewInput from "../validateInput";

export default function WriteReview() {
  const loadedListings = useLoaderData();

  let validateReviewInformationCheckResult = {};

  const [propertyId, setPropertyId] = useState("1");
  const [reviewerFirstName, setReviewerFirstName] = useState("");
  const [reviewerLastName, setReviewerLastName] = useState("");
  const [reviewerClass, setReviewerClass] = useState("sophomore");
  const [rating, setRating] = useState("5");
  const [reviewComments, setReviewComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSubmitted, setTimeSubmitted] = useState(new Date().getTime());
  const [formSavingError, setFormSavingError] = useState(false);

  const [validationError, setValidationError] = useState({});

  const reviewerClassOptions = [
    ["Freshman", "Freshman"],
    ["Sophomore", "Sophomore"],
    ["Junior", "Junior"],
    ["Senior", "Senior"],
    ["1st Year Master's", "1st Year Master's"],
    ["2nd Year Master's", "2nd Year Master's"],
    ["Post Doc", "Post Doc"],
  ];
  const reviewRatingOptions = [
    ["0.5", "0.5 Star"],
    ["1", "1 Star"],
    ["1.5", "1.5 Star"],
    ["2", "2 Star"],
    ["2.5", "2.5 Star"],
    ["3", "3 Star"],
    ["3.5", "3.5 Star"],
    ["4", "4 Star"],
    ["4.5", "4.5 Star"],
    ["5", "5 Star"],
  ];

  function reset() {
    setPropertyId("1");
    setReviewerFirstName("");
    setReviewerLastName("");
    setReviewerClass("sophomore");
    setRating("5");
    setReviewComments("");
    setIsSubmitted(false);
    setTimeSubmitted(new Date().getTime());
    setFormSavingError(false);
    setValidationError({});
  }

  function getReviewedPropertyTitle(propertyId) {
    const reviewedProperty = loadedListings.filter((listing) => {
      return listing.id === propertyId;
    });

    return reviewedProperty[0].title;
  }

  useEffect(() => {
    document.title = `UniNest: Write a Review`;
  }, []);

  return (
    <div className="container custom-font">
      {isSubmitted ? (
        <div className="mx-auto form-submission-details">
          <p className="mt-4">
            The review has been submitted. Thank you for taking the time to
            review a property you have stayed at.
          </p>
          <p>Here are the details of your review.</p>
          <h3 className="mt-5">Your Details</h3>
          <p>
            Name:{" "}
            <span className="highlight-values">
              {reviewerFirstName} {reviewerLastName}
            </span>
          </p>
          <p>
            Class: <span className="highlight-values">{reviewerClass}</span>
          </p>
          <h3 className="mt-5">Your Review</h3>
          <h5>
            <span className="mt-2 star-icons">{generateStarIcons(rating)}</span>
          </h5>
          <p data-testid="property-reviewed">
            Property Reviewed:{" "}
            <span className="highlight-values">
              {getReviewedPropertyTitle(propertyId)}
            </span>
          </p>
          <p>
            Comments: <span className="highlight-values">{reviewComments}</span>
          </p>
          <p>
            Time Submitted:{" "}
            <span className="highlight-values">
              {convertMillisecondsToReadableDate(timeSubmitted)}
            </span>
          </p>
          <div>
            <Link
              className="btn btn-dark custom-bg-button my-5"
              to="/writeReview"
              onClick={() => {
                setIsSubmitted(false);
                reset();
                toast.success(
                  "Successfully selected the option to write another review. Thank you for taking the time to review another property!"
                );
              }}
            >
              Write Another Review
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            validateReviewInformationCheckResult = validateReviewInput(
              reviewerFirstName,
              reviewerLastName,
              reviewComments
            );

            console.log(validateReviewInformationCheckResult);

            if (
              Object.keys(validateReviewInformationCheckResult).length === 0
            ) {
              saveReview({
                listingId: propertyId,
                reviewerFirstName: reviewerFirstName,
                reviewerLastName: reviewerLastName,
                reviewerClass: reviewerClass,
                rating: rating,
                reviewText: reviewComments,
                timestamp: timeSubmitted,
              }).then(
                () => {
                  setIsSubmitted(true);
                  setFormSavingError(false);
                  toast.success("Successfully wrote and submitted the review.");
                },
                () => {
                  setFormSavingError(true);
                  setIsSubmitted(false);
                  toast.error(
                    "Unsuccessfully submitted the review. Please try again!"
                  );
                }
              );
            } else {
              setValidationError(validateReviewInformationCheckResult);
            }
          }}
        >
          <h1 className="mb-4 review-header">Write a Review</h1>

          <div className="my-3">
            <label htmlFor="property-selection" className="form-label">
              Property Name
            </label>
            <select
              data-testid="property-name"
              className="form-select form-select-md mb-3"
              id="property-selection"
              required
              aria-label=".form-select-lg example"
              value={propertyId}
              onChange={(event) => {
                setPropertyId(event.target.value.toString());
              }}
            >
              {loadedListings.map((listing) => {
                return (
                  <option key={listing.id} value={listing.id}>
                    {listing.title}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">
              Please choose a property name.
            </div>
          </div>

          <div className="my-3">
            <InputText
              label="Reviewer First Name"
              id="reviewer-first-name"
              value={reviewerFirstName}
              validationError={() => {
                return (
                  validationError.hasOwnProperty("firstName") && (
                    <div className="text-danger">
                      {validationError["firstName"]}
                    </div>
                  )
                );
              }}
              onChange={(event) => {
                setReviewerFirstName(event.target.value);
              }}
            />
          </div>

          <div className="my-3">
            <InputText
              label="Reviewer Last Name"
              id="reviewer-last-name"
              value={reviewerLastName}
              validationError={() => {
                return (
                  validationError.hasOwnProperty("lastName") && (
                    <div className="text-danger">
                      {validationError["lastName"]}
                    </div>
                  )
                );
              }}
              onChange={(event) => {
                setReviewerLastName(event.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="my-3 col-6">
              <SelectInput
                label={"Class"}
                value={reviewerClass}
                options={reviewerClassOptions}
                onChange={(event) => {
                  setReviewerClass(event.target.value);
                }}
              />
            </div>

            <div className="my-3 col-6">
              <SelectInput
                label={"Rating"}
                value={rating}
                options={reviewRatingOptions}
                onChange={(event) => {
                  setRating(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <InputTextArea
              label={"Review Comments"}
              id={"review-comments"}
              value={reviewComments}
              validationError={() => {
                return (
                  validationError.hasOwnProperty("reviewText") && (
                    <div className="text-danger">
                      {validationError["reviewText"]}
                    </div>
                  )
                );
              }}
              onChange={(event) => {
                setReviewComments(event.target.value);
              }}
            />
          </div>

          <button
            data-testid="submit-button"
            type="submit"
            className="btn btn-primary my-3 btn-color"
            onClick={() => {
              const currentTimestamp = new Date().getTime();
              setTimeSubmitted(currentTimestamp);
            }}
          >
            Submit
          </button>

          <button
            data-testid="reset-button"
            type="button"
            className="btn btn-secondary ms-1 my-3"
            onClick={() => reset()}
          >
            Reset
          </button>

          {formSavingError ? (
            <div className="mb-3 text-danger">
              Error submitting the form. Please try again!
            </div>
          ) : (
            <></>
          )}
        </form>
      )}
      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
}

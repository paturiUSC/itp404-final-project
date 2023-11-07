import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import InputText from "../Form/InputText";
import "../CSS/WriteReview.css";
import { saveReview } from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewProto()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    const [propertyName, setPropertyName] = useState("1");
    const [reviewerFirstName, setReviewerFirstName] = useState("");
    const [reviewerLastName, setReviewerLastName] = useState("");
    const [reviewerClass, setReviewerClass] = useState("sophomore");
    const [rating, setRating] = useState("5");
    const [reviewComments, setReviewComments] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeSubmitted, setTimeSubmitted] = useState(new Date().getTime());
    const [isError, setIsError] = useState(false);

    function reset()
    {
        setPropertyName("");
        setReviewerFirstName("");
        setReviewerLastName("");
        setReviewerClass("sophomore");
        setRating("5");
        setReviewComments("");
        setIsSubmitted(false);
        setTimeSubmitted(new Date().getTime());
        setIsError(false);
    }

    function convertMillisecondsToReadableDate(timestamp) {
        const date = new Date(timestamp);
      
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
        return formattedDate;
      }

    return (<div className="container custom-font">
        {isSubmitted ? 
            (
                <div>
                    <p>The review has been submitted. Thank you for taking the time to review a property you have stayed at.</p>
                    <p>Here are the details of your review.</p>
                    <p>Property Reviewed:<span className="highlight-values">{propertyName}</span></p>
                    <p>Your Name:<span className="highlight-values">{reviewerFirstName} {reviewerLastName}</span></p>
                    <p>Your Class:<span className="highlight-values">{reviewerClass}</span></p>
                    <p>Rating:<span className="highlight-values">{rating}</span></p>
                    <p>Comments:<span className="highlight-values">{reviewComments}</span></p>
                    <p>Time Submitted:<span className="highlight-values">{convertMillisecondsToReadableDate(timeSubmitted)}</span></p>
                    <div>
                        <Link className="btn btn-dark custom-bg-button my-5" to="/writeReview" onClick={() => {
                            setIsSubmitted(false);
                            reset();
                        }}>Write Another Review</Link>
                    </div>
                </div>
            ) : 
            (<form onSubmit={(event) => {
            event.preventDefault();

            saveReview({
                listingId: propertyName,
                reviewerFirstName: reviewerFirstName, 
                reviewerLastName: reviewerLastName,
                reviewerClass: reviewerClass, 
                rating: rating, 
                reviewText: reviewComments, 
                timestamp: timeSubmitted
            }).then(() => {
                setIsSubmitted(true);
                setIsError(false);
                toast.success("Successfully wrote and submitted the review.");
            }, () => {
                setIsError(true);
                setIsSubmitted(false);
                toast.error("Unsuccessfully wrote and submitted the review. Please try again!");
            });

        }}>
            <h1 className="mb-4 review-header">Write a Review</h1>

            <div className="my-3">
                <label htmlFor="property-selection" className="form-label">Property Name</label>
                <select className="form-select form-select-md mb-3" id="property-selection" required aria-label=".form-select-lg example" value={propertyName} onChange={(event) => {
                    setPropertyName(event.target.value.toString());
                }}>
                    {loadedListings.map((listing) => {
                        return <option key={listing.id} value={listing.id}>{listing.title}</option>
                    })}
                </select>
                <div className="invalid-feedback">
                    Please choose a property name.
                </div>
            </div>

            <div className="my-3">
                <InputText label="Reviewer First Name" id="reviewer-first-name" value={reviewerFirstName} onChange={(event) => {
                    setReviewerFirstName(event.target.value);
                }} />
            </div>

            <div className="my-3">
                <InputText label="Reviewer Last Name" id="reviewer-last-name" value={reviewerLastName} onChange={(event) => {
                    setReviewerLastName(event.target.value);
                }} />
            </div>
            
            <div className="row">
                <div className="my-3 col-6">
                    <label htmlFor="class-selection" className="form-label">Class</label>
                    <select className="form-select form-select-md mb-3" id="class-selection" required aria-label=".form-select-lg example" value={reviewerClass} onChange={(event) => {
                        setReviewerClass(event.target.value);
                    }}>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="1st Year Master's">1st Year Master's</option>
                        <option value="2nd Year Master's">2nd Year Master's</option>
                        <option value="Post Doc">Post Doc</option>
                    </select>
                    <div className="invalid-feedback">
                        Please choose a class.
                    </div>
                </div>

                <div className="my-3 col-6">
                    <label htmlFor="rating-selection" className="form-label">Rating</label>
                    <select className="form-select form-select-md mb-3" id="rating-selection" required aria-label=".form-select-lg example" value={rating} onChange={(event) => {
                        setRating(event.target.value);
                    }}>
                        <option value="0">0 Star</option>
                        <option value="0.5">0.5 Star</option>
                        <option value="1">1 Star</option>
                        <option value="1.5">1.5 Star</option>
                        <option value="2">2 Star</option>
                        <option value="2.5">2.5 Star</option>
                        <option value="3">3 Star</option>
                        <option value="3.5">3.5 Star</option>
                        <option value="4">4 Star</option>
                        <option value="4.5">4.5 Star</option>
                        <option value="5">5 Star</option>
                    </select>
                    <div className="invalid-feedback">
                        Please choose a rating.
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="review-comments" className="form-label">
                    Review Comments
                </label>
                <textarea className="form-control" id="review-comments" required rows="3" value={reviewComments} onChange={(event) => {
                    setReviewComments(event.target.value);
                }}/>  
                <div className="invalid-feedback">
                    Please type a review.
                </div>
            </div>

            <button type="submit" className="btn btn-primary my-3 btn-color" onClick={()=> {
                const currentTimestamp = new Date().getTime();
                setTimeSubmitted(currentTimestamp);
            }}>
                Submit
            </button>

            <button type="button" className="btn btn-secondary ms-1 my-3" onClick={() => reset()}>
                Reset
            </button>

            {isError ? <div className="mb-3 text-danger">Error submitting the form. Please try again!</div>: <></>}

        </form>)}
        <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
    );
}
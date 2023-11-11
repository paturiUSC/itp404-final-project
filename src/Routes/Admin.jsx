import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import "../CSS/Admin.css";
import Checkbox from "./Checkbox";
import { deleteReview } from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() 
{
    const loadedReviews = useLoaderData(); 
    const [allReviews, setAllReviews] = useState(loadedReviews);
    const [selectedReviews, setSelectedReviews] = useState([]);

    return (
        <div className="container-fluid">
            <div>
                <h1>Admin Page</h1>

                <div className="mt-3 mb-5">
                    <button className="btn btn-danger mr-4" disabled={selectedReviews.length === 0} onClick={() => {
                        const deletePromises = selectedReviews.map((selectedReview) => {
                            console.log("Selected Review", selectedReview);
                            deleteReview(selectedReview);
                        })
                        
                        console.log(selectedReviews);

                        Promise.all(deletePromises).then(() => {
                            setAllReviews(allReviews.filter((review) => {
                                console.log("Filtering out", review.id);
                                return !selectedReviews.includes(review.id);
                            }))
                            setSelectedReviews([]);
                            toast.success("All selected messages have been successfully deleted");

                        }, (error) => {
                            console.log(error);
                            toast.error("All selected messages have not been successfully deleted. Please try again!");
                        })
                    }}>Delete</button>
                </div>
                
                <ul className="list-group mb-3">
                    {
                        allReviews.map((review) => {
                            return <li key={review.id} className="list-group-item">
                                    <div className="row align-items-center"> 
                                        <div className="col-2">
                                            <input type="checkbox" checked={selectedReviews.includes(review.id)} onChange={() => {
                                                const newSelectedReviews = [...selectedReviews, review.id];
                                                selectedReviews.includes(review.id) ? setSelectedReviews(selectedReviews.filter((selectedReviewId) => selectedReviewId !== review.id)) : setSelectedReviews(newSelectedReviews);
                                            }}/>
                                        </div>
                                        <div className="col-10">
                                            <ReviewCard key={review.id} id={review.id} rating={review.rating} reviewText={review.reviewText} reviewerClass={review.reviewerClass} reviewerFirstName={review.reviewerFirstName} reviewerLastName={review.reviewerLastName} timestamp={review.timestamp}/>
                                            
                                        </div>
                                    </div>
                                </li>;
                        })
                    }
                </ul>
            </div>
            <ToastContainer position="bottom-left" autoClose={5000} />
        </div>
    );
}
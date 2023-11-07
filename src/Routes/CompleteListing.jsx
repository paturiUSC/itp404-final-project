import { useLoaderData, NavLink } from "react-router-dom";
import "../CSS/CompleteListing.css";
import React, { useState } from "react";
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { deleteReview, saveBookmark } from "../api";
import ReviewCard from "./ReviewCard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CompleteListing() 
{
    const loadedListing = useLoaderData();

    const [listing, setListing] = useState(loadedListing);
    console.log(listing);

    const [bookmark, setBookmark] = useState(listing.bookmarked);

    function splitAddress() 
    {
        const splitAddressInfo = [];

        const firstCommaIndex = listing.address.indexOf(",");

        const addressLine = listing.address.substring(0, firstCommaIndex);
        splitAddressInfo.push(addressLine);
        const cityStateZip = listing.address.substring(firstCommaIndex + 1); 
        splitAddressInfo.push(cityStateZip);

        return splitAddressInfo;
    }

    return (
        <div>
            <div className="container-fluid">
                <NavLink className="back-button d-flex" to="/listings"> <ArrowLeftCircle size={26}/> 
                    <span className="view-listings">View All Listings</span>
                </NavLink>
            </div>

            <div className="container mt-4 mb-5 font-styling">
                <div>
                    <div className="container text-center">
                        <a href="#details" className="d-inline-block mx-5 btn custom-bg-button">
                            Details
                        </a>
                        <a href="#reviews" className="d-inline-block mx-5 btn custom-bg-button">
                            Reviews
                        </a>
                    </div>
                    <h2 id="details" className="mt-4">{listing.title}</h2>
                    <p className="address-spacing">{splitAddress()[0]}</p>
                    <p>{splitAddress()[1]}</p>
                    <div className="d-flex flex-column">
                        <div className="row">
                            <div className="col-7">
                                <img src={listing.propertyImageURL} className="img-fluid w-100 img-height" alt={listing.title} />
                            </div>
                            <div className="card col-5">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <p className="description-styling">Bedrooms: {listing.bedrooms}</p>
                                    <p className="description-styling">Bathrooms: {listing.bathrooms}</p>
                                    <p className="description-styling">Rent: ${listing.rent}</p>
                                    <p className="description-styling">Distance from Village: {listing.distanceFromVillage} miles</p>
                                    <p className="description-styling">Shryft Zone: {listing.shryftZone ? "Yes": "No"}</p>
                                    <p className="description-styling">In-Unit Laundry: {listing.inUnitLaundrt ? "Yes": "No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="reviews-header mt-4 mb-2" id="reviews">Reviews</h2>
                        {
                            listing.reviews.length !== 0 ? (
                                <div>
                                    {listing.reviews.sort((review1, review2) => review2.timestamp - review1.timestamp).map((review) => {
                                        return (
                                            <ReviewCard key={review.id} id={review.id} rating={review.rating} reviewText={review.reviewText} reviewerClass={review.reviewerClass} reviewerFirstName={review.reviewerFirstName} reviewerLastName={review.reviewerLastName} timestamp={review.timestamp} onClick={(deletedReviewId) => {
                                                deleteReview(deletedReviewId).then(() => {
                                                    toast.success("Successfully deleted the review.")
                                                }, () => {
                                                    toast.error("Unsuccesfully deleted the review. Please try again!")
                                                });
                                                setListing({
                                                    ...listing, 
                                                    reviews: listing.reviews.filter((review) => {
                                                        return review.id !== deletedReviewId;
                                                    })
                                                })
                                            }}/>
                                          );
                                    })}
                                </div>
                            ) : (
                                <div>
                                    No Reviews Have Been Submitted For This Property Yet!
                                    <div>
                                        <NavLink to="/writeReview">
                                            <button type="submit" className="btn btn-secondary my-3 mb-5 custom-bg-button">
                                                Write A Review
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <button className="btn btn-secondary btn-color btn-lg mt-4 mb-5" id="bookmark" onClick={() => {
                        const updatedBookmarkData = {
                            "bookmarked": bookmark ? false : true
                        };

                        saveBookmark(listing.id, updatedBookmarkData);
                        setBookmark(bookmark ? false : true);
                    }}>Bookmark</button>
                </div>
            </div>
            <ToastContainer position="bottom-left" autoClose={5000} />
        </div>
    )
}
import { useLoaderData, NavLink } from "react-router-dom";
import "../CSS/CompleteListing.css";
import React, { useState } from "react";
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { saveBookmark } from "../api";

export default function CompleteListing() 
{
    const loadedListing = useLoaderData();
    console.log(loadedListing);

    const [bookmark, setBookmark] = useState(loadedListing.bookmarked);

    function splitAddress() 
    {
        const splitAddressInfo = [];

        const firstCommaIndex = loadedListing.address.indexOf(",");

        const addressLine = loadedListing.address.substring(0, firstCommaIndex);
        splitAddressInfo.push(addressLine);
        const cityStateZip = loadedListing.address.substring(firstCommaIndex + 1); 
        splitAddressInfo.push(cityStateZip);

        return splitAddressInfo;
    }

    function convertMillisecondsToReadableDate(timestamp) {
        const date = new Date(timestamp);
      
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;
    
        return formattedDate;
    }

    function generateStarIcons(rating) {
        const maxRating = 5; 
        const starIcons = [];
      
        for (let i = 1; i <= maxRating; i++) {
          if (i <= rating) {
            starIcons.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
          } else if (i - rating <= 0.5) {
            starIcons.push(<i key={i} className="bi bi-star-half text-warning"></i>);
          } else {
            starIcons.push(<i key={i} className="bi bi-star text-warning"></i>);
          }
        }
      
        return starIcons;
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
                    <h2 id="details" className="mt-4">{loadedListing.title}</h2>
                    <p className="address-spacing">{splitAddress()[0]}</p>
                    <p>{splitAddress()[1]}</p>
                    <div className="d-flex flex-column">
                        <div className="row">
                            <div className="col-7">
                                <img src={loadedListing.propertyImageURL} className="img-fluid w-100 img-height" alt="Listing Image" />
                            </div>
                            <div className="card col-5">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <p className="description-styling">Bedrooms: {loadedListing.bedrooms}</p>
                                    <p className="description-styling">Bathrooms: {loadedListing.bathrooms}</p>
                                    <p className="description-styling">Rent: ${loadedListing.rent}</p>
                                    <p className="description-styling">Distance from Village: {loadedListing.distanceFromVillage} miles</p>
                                    <p className="description-styling">Shryft Zone: {loadedListing.shryftZone ? "Yes": "No"}</p>
                                    <p className="description-styling">In-Unit Laundry: {loadedListing.inUnitLaundrt ? "Yes": "No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="reviews-header mt-4 mb-2" id="reviews">Reviews</h2>
                        {
                            loadedListing.reviews.length !== 0 ? (
                                <div>
                                    {loadedListing.reviews.map((review) => {
                                        return (
                                            <div key={review.id} className="card mb-3">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h4 className="card-title star-icons">{generateStarIcons(review.rating)}</h4>
                                                        </div>
                                                        <div className="col-md-6 text-md-end">
                                                            <h6 className="card-subtitle mb-2 text-muted">{review.reviewerName} <span className="reviewer-class">({review.reviewerClass})</span></h6>
                                                        </div>
                                                    </div>
                                                    <p className="card-text mt-2">{review.reviewText}</p>
                                                    <p className="card-text review-written">{convertMillisecondsToReadableDate(review.timestamp)}</p>
                                                </div>
                                            </div>
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
                    <button className="btn btn-primary btn-color btn-lg mt-4 mb-5" id="bookmark" onClick={() => {
                        const updatedBookmarkData = {
                            "bookmarked": bookmark ? false : true
                        };

                        saveBookmark(loadedListing.id, updatedBookmarkData);
                        setBookmark(bookmark ? false : true);
                    }}>Bookmark</button>
                </div>
            </div>
        </div>
    )
}
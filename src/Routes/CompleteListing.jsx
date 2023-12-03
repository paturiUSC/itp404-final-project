import { useLoaderData, NavLink } from "react-router-dom";
import "../CSS/CompleteListing.css";
import React, { useState, useEffect } from "react";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { deleteReview, saveBookmark } from "../api";
import ReviewCard from "./ReviewCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InformationAccordion from "./InformationAccordion";
import { splitAddress } from "../widelyUsedFunctions";

export default function CompleteListing() {
  const loadedListing = useLoaderData();

  const [listing, setListing] = useState(loadedListing);

  const [bookmark, setBookmark] = useState(listing.bookmarked);

  const [activeAccordionKey, setActiveAccordionKey] = useState();

  useEffect(() => {
    document.title = `UniNest Listing: ${listing.title} At ${listing.address}`;
  }, [listing.address, listing.title]);

  return (
    <div>
      <div className="container-fluid">
        <NavLink className="back-button d-flex" to="/listings">
          {" "}
          <ArrowLeftCircle size={26} />
          <span className="view-listings">View All Listings</span>
        </NavLink>
      </div>

      <div className="container mt-4 mb-5 font-styling">
        <div>
          <div className="container text-center">
            <a
              href="#details"
              className="d-inline-block mx-5 btn custom-bg-button"
            >
              Details
            </a>
            <a
              href="#reviews"
              className="d-inline-block mx-5 btn custom-bg-button"
            >
              Reviews
            </a>
          </div>
          <h2 id="details" className="mt-4">
            {listing.title}
          </h2>
          <p className="address-spacing">{splitAddress(listing.address)[0]}</p>
          <p>{splitAddress(listing.address)[1]}</p>
          <div className="d-flex flex-column">
            <div className="row">
              <div className="col-7">
                <img
                  src={listing.propertyImageURL}
                  className="img-fluid w-100 img-height"
                  alt={listing.title}
                />
              </div>
              <div className="card col-5 listing-details">
                <div className="card-body d-flex flex-column justify-content-center">
                  <InformationAccordion
                    information={[
                      { Bedrooms: listing.bedrooms },
                      { Bathrooms: listing.bathrooms },
                      { Rent: "$" + listing.rent },
                      {
                        "Distance from Village":
                          listing.distanceFromVillage + " mi",
                      },
                      { "Shryft Zone": listing.shryftZone ? "Yes" : "No" },
                      {
                        "In-Unit Laundry": listing.inUnitLaundrt ? "Yes" : "No",
                      },
                    ]}
                    activeAccordionKey={activeAccordionKey}
                    onSelect={(returnedActiveAccordionKey) => {
                      console.log(returnedActiveAccordionKey);
                      setActiveAccordionKey(returnedActiveAccordionKey);
                    }}
                    message={
                      activeAccordionKey == null && (
                        <div className="text-danger mb-2">
                          Please feel free to view any of the listing
                          information in the accordian below.
                        </div>
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="reviews-header mt-4 mb-2" id="reviews">
              Reviews
            </h2>
            {listing.reviews.length !== 0 ? (
              <div>
                {listing.reviews
                  .sort(
                    (review1, review2) => review2.timestamp - review1.timestamp
                  )
                  .map((review) => {
                    return (
                      <ReviewCard
                        key={review.id}
                        id={review.id}
                        rating={review.rating}
                        reviewText={review.reviewText}
                        reviewerClass={review.reviewerClass}
                        reviewerFirstName={review.reviewerFirstName}
                        reviewerLastName={review.reviewerLastName}
                        timestamp={review.timestamp}
                        button={"Delete"}
                        onClick={(deletedReviewId) => {
                          deleteReview(deletedReviewId).then(
                            () => {
                              toast.success("Successfully deleted the review.");
                            },
                            () => {
                              toast.error(
                                "Unsuccesfully deleted the review. Please try again!"
                              );
                            }
                          );
                          setListing({
                            ...listing,
                            reviews: listing.reviews.filter((review) => {
                              return review.id !== deletedReviewId;
                            }),
                          });
                        }}
                      />
                    );
                  })}
              </div>
            ) : (
              <div>
                No Reviews Have Been Submitted For This Property Yet!
                <div>
                  <NavLink to="/writeReview">
                    <button
                      type="submit"
                      className="btn btn-secondary my-3 mb-5 custom-bg-button"
                    >
                      Write A Review
                    </button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          <button
            data-testid="bookmark-button"
            className="btn btn-secondary btn-color btn-lg mt-4 mb-5"
            id="bookmark"
            onClick={() => {
              const updatedBookmarkData = {
                bookmarked: bookmark ? false : true,
              };
              saveBookmark(listing.id, updatedBookmarkData).then(
                () => {
                  bookmark
                    ? toast.success("Successfully unbookmarked the listing.")
                    : toast.success("Successfully bookmarked the listing.");
                },
                () => {
                  bookmark
                    ? toast.error("Unsuccessfully unbookmarked the listing.")
                    : toast.error(
                        "Unsuccesfully bookmarked the listing. Please try again!"
                      );
                }
              );
              setBookmark(bookmark ? false : true);
            }}
          >
            {bookmark ? "Un-bookmark" : "Bookmark"}
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
}

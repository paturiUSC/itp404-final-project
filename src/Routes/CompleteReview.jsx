import { useLoaderData, NavLink } from "react-router-dom";
import InformationAccordion from "./InformationAccordion";
import { useState, useEffect } from "react";
import { fetchListingById } from "../api";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import {
  generateStarIcons,
  convertMillisecondsToReadableDate,
} from "../widelyUsedFunctions";

export default function CompleteReview() {
  const loadedReview = useLoaderData();

  const [
    activeAccordionKeyForReviewerInfo,
    setActiveAccordionKeyForReviewerInfo,
  ] = useState();

  const [
    activeAccordionKeyForReviewedPropertyInfo,
    setActiveAccordionKeyForReviewedPropertyInfo,
  ] = useState();

  const [reviewedPropertyInformation, setReviewedPropertyInformation] =
    useState(null);

  useEffect(() => {
    const fetchReviewedPropertyInformation = () => {
      fetchListingById(loadedReview.listingId)
        .then((response) => {
          return response;
        })
        .then((reviewedPropertyInformation) => {
          setReviewedPropertyInformation(reviewedPropertyInformation);
        })
        .catch((error) => {
          console.error("Error fetching property information:", error);
        });
    };

    fetchReviewedPropertyInformation();
    document.title = `UniNest Review: ${loadedReview.reviewerFirstName} ${
      loadedReview.reviewerLastName
    } Written on ${convertMillisecondsToReadableDate(loadedReview.timestamp)}`;
  }, [
    loadedReview.listingId,
    loadedReview.reviewerFirstName,
    loadedReview.reviewerLastName,
    loadedReview.timestamp,
  ]);

  return (
    <div>
      <div className="container-fluid">
        <NavLink
          className="back-button d-flex mb-3"
          to={`/listings/${loadedReview.listingId}`}
        >
          {" "}
          <ArrowLeftCircle size={26} />
          <span className="view-listings">Go Back To Listing</span>
        </NavLink>
      </div>
      <div className="container">
        <h2>Review/Reviewer Information</h2>
        <InformationAccordion
          information={[
            { Review: loadedReview.reviewText },
            { "Reviewer First Name": loadedReview.reviewerFirstName },
            { "Reviewer Last Name": loadedReview.reviewerLastName },
            { "Reviewer Class": loadedReview.reviewerClass },
            {
              "Review Submitted": convertMillisecondsToReadableDate(
                loadedReview.timestamp
              ),
            },
            { "Review Rating": generateStarIcons(loadedReview.rating) },
          ]}
          activeAccordionKey={activeAccordionKeyForReviewerInfo}
          onSelect={(returnedActiveAccordionKey) => {
            setActiveAccordionKeyForReviewerInfo(returnedActiveAccordionKey);
          }}
          message={
            activeAccordionKeyForReviewerInfo == null && (
              <div className="text-danger mb-2 mt-1">
                Please feel free to view any of the information about the review
                in the accordian below.
              </div>
            )
          }
        />

        <h2 className="mt-5">Reviewed Property Information</h2>
        <InformationAccordion
          information={[
            { "Property Name": reviewedPropertyInformation?.title },
            { "Property Address": reviewedPropertyInformation?.address },
            {
              Configuration:
                reviewedPropertyInformation?.bedrooms +
                "b" +
                reviewedPropertyInformation?.bathrooms +
                "b",
            },
          ]}
          activeAccordionKey={activeAccordionKeyForReviewedPropertyInfo}
          onSelect={(returnedActiveAccordionKey) => {
            setActiveAccordionKeyForReviewedPropertyInfo(
              returnedActiveAccordionKey
            );
          }}
          message={
            activeAccordionKeyForReviewedPropertyInfo == null && (
              <div className="text-danger mb-2 mt-1">
                Please feel free to view any of the information about the
                reviewed property in the accordian below.
              </div>
            )
          }
        />
      </div>
    </div>
  );
}

import { useLoaderData } from "react-router-dom";
import InformationAccordion from "./InformationAccordion";
import { useState, useEffect } from "react";
import { fetchListingById } from "../api";

export default function CompleteReview() {
  const loadedReview = useLoaderData();
  console.log(loadedReview);

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
  }, [loadedReview.listingId]);

  function convertMillisecondsToReadableDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  function generateStarIcons(rating) {
    const maxRating = 5;
    const starIcons = [];

    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        starIcons.push(
          <i key={i} className="bi bi-star-fill text-warning"></i>
        );
      } else if (i - rating <= 0.5) {
        starIcons.push(
          <i key={i} className="bi bi-star-half text-warning"></i>
        );
      } else {
        starIcons.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return starIcons;
  }

  return (
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
              Please feel free to view any of the information about the reviewed
              property in the accordian below.
            </div>
          )
        }
      />
    </div>
  );
}

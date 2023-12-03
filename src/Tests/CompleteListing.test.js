import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CompleteListing from "../Routes/CompleteListing";
import { BrowserRouter, useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
  NavLink: jest.fn(),
}));

const mockedListingBookmarkedProperty = {
  id: "1",
  title: "The Lorenzo - Luxurious Apartments near USC",
  bedrooms: 2,
  bathrooms: 2,
  rent: 1340,
  distanceFromVillage: 1.2,
  shryftZone: true,
  inUnitLaundry: false,
  address: "325 W Adams Blvd, Los Angeles, CA 90007",
  propertyImageURL:
    "https://media.apts247.info/e7/e7442b2fab3e4435889200f63d4e088d/hero_shot/community/Lorenzo.jpg",
  bookmarked: true,
  reviews: [
    {
      id: "1",
      listingId: "1",
      reviewerFirstName: "Jack",
      reviewerLastName: "Smith",
      reviewerClass: "Sophomore",
      rating: 3.5,
      reviewText:
        "Great location but there are no laundry facilities. Not overly pricey for the luxury.",
      timestamp: 1531101239011,
    },
    {
      id: "3",
      listingId: "1",
      reviewerFirstName: "Louie",
      reviewerLastName: "Smith",
      reviewerClass: "Senior",
      rating: 4,
      reviewText:
        "No in-unit laundry but very close to campus! Good property management too.",
      timestamp: 1639019757023,
    },
  ],
};

const mockedListingUnbookmarkedProperty = {
  id: "1",
  title: "The Lorenzo - Luxurious Apartments near USC",
  bedrooms: 2,
  bathrooms: 2,
  rent: 1340,
  distanceFromVillage: 1.2,
  shryftZone: true,
  inUnitLaundry: false,
  address: "325 W Adams Blvd, Los Angeles, CA 90007",
  propertyImageURL: "",
  bookmarked: false,
  reviews: [
    {
      id: "1",
      listingId: "1",
      reviewerFirstName: "Jack",
      reviewerLastName: "Smith",
      reviewerClass: "Sophomore",
      rating: 3.5,
      reviewText:
        "Great location but there are no laundry facilities. Not overly pricey for the luxury.",
      timestamp: 1531101239011,
    },
    {
      id: "3",
      listingId: "1",
      reviewerFirstName: "Louie",
      reviewerLastName: "Smith",
      reviewerClass: "Senior",
      rating: 4,
      reviewText:
        "No in-unit laundry but very close to campus! Good property management too.",
      timestamp: 1639019757023,
    },
  ],
};

const MockedDataProviderBookmarkedProperty = ({ children }) => {
  useLoaderData.mockReturnValue(mockedListingBookmarkedProperty);
  return <BrowserRouter>{children}</BrowserRouter>;
};

const MockedDataProviderUnbookmarkedProperty = ({ children }) => {
  useLoaderData.mockReturnValue(mockedListingUnbookmarkedProperty);
  return <BrowserRouter>{children}</BrowserRouter>;
};

test("sorting of the reviews in descending order based on the time the review was submitted", () => {
  const { getAllByTestId } = render(
    <MockedDataProviderBookmarkedProperty>
      <CompleteListing />
    </MockedDataProviderBookmarkedProperty>
  );

  const reviewTimestamps = getAllByTestId("review-timestamp").map(
    (reviewTimestamp) => parseInt(reviewTimestamp.textContent)
  );

  for (let i = 0; i < reviewTimestamps.length - 1; i++) {
    expect(reviewTimestamps[i]).toBeGreaterThan(reviewTimestamps[i + 1]);
  }
});

test("deleting a review", () => {
  const { getByTestId, getAllByTestId } = render(
    <MockedDataProviderBookmarkedProperty>
      <CompleteListing />
    </MockedDataProviderBookmarkedProperty>
  );

  const numberOfReviews = getAllByTestId("review-card").length;
  expect(numberOfReviews).toBe(mockedListingBookmarkedProperty.reviews.length);

  const firstReviewDeleteButton = getByTestId("review-card-1-delete");
  fireEvent.click(firstReviewDeleteButton);

  const numberOfReviewsAfterDelete = getAllByTestId("review-card").length;
  expect(numberOfReviewsAfterDelete).toBe(
    mockedListingBookmarkedProperty.reviews.length - 1
  );
});

test("pressing bookmark button removes the property from the bookmarked properties if the property is already bookmarked", () => {
  const { getByTestId } = render(
    <MockedDataProviderBookmarkedProperty>
      <CompleteListing />
    </MockedDataProviderBookmarkedProperty>
  );

  const bookmarkButton = getByTestId("bookmark-button");
  expect(bookmarkButton).toHaveTextContent(
    mockedListingBookmarkedProperty.bookmarked ? "Un-bookmark" : "Bookmark"
  );
  fireEvent.click(bookmarkButton);
  expect(bookmarkButton).toHaveTextContent(
    !mockedListingBookmarkedProperty.bookmarked ? "Un-bookmark" : "Bookmark"
  );
});

test("pressing bookmark button bookmarks the property if the property is not yet bookmarked", () => {
  const { getByTestId } = render(
    <MockedDataProviderUnbookmarkedProperty>
      <CompleteListing />
    </MockedDataProviderUnbookmarkedProperty>
  );

  const bookmarkButton = getByTestId("bookmark-button");
  expect(bookmarkButton).toHaveTextContent(
    mockedListingUnbookmarkedProperty.bookmarked ? "Un-bookmark" : "Bookmark"
  );
  fireEvent.click(bookmarkButton);
  expect(bookmarkButton).toHaveTextContent(
    !mockedListingUnbookmarkedProperty.bookmarked ? "Un-bookmark" : "Bookmark"
  );
});

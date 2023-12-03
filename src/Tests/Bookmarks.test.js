import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Bookmarks from "../Routes/Bookmarks";
import { BrowserRouter, useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
  NavLink: jest.fn(),
}));

const mockedBookmarkedListings = [
  {
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
  },
  {
    id: "2",
    title: "The Orion - Single-Unit Housing with a View of Downtown",
    bedrooms: 6,
    bathrooms: 4.5,
    rent: 1100,
    distanceFromVillage: 0.73,
    shryftZone: false,
    inUnitLaundry: true,
    address: "10573 W Pico Blvd, Los Angeles, CA 90064",
    propertyImageURL:
      "https://lirp.cdn-website.com/951f8cd2/dms3rep/multi/opt/Living+Room+3-432w.jpeg",
    bookmarked: true,
    reviews: [
      {
        id: "2",
        listingId: "2",
        reviewerFirstName: "Jack",
        reviewerLastName: "Son",
        reviewerClass: "Junior",
        rating: 5,
        reviewText:
          "Spacious house with a beautiful view of downtown! Cost-effective!",
        timestamp: 1636019754000,
      },
    ],
  },
];

const MockedDataProvider = ({ children }) => {
  useLoaderData.mockReturnValue(mockedBookmarkedListings);
  return <BrowserRouter>{children}</BrowserRouter>;
};

test("unbookmarking an already bookmarked property", () => {
  const { getByTestId, getAllByTestId } = render(
    <MockedDataProvider>
      <Bookmarks />
    </MockedDataProvider>
  );

  const numberOfBookmarkedProperties = getAllByTestId("listing-preview").length;
  expect(numberOfBookmarkedProperties).toBe(mockedBookmarkedListings.length);

  const firstReviewDeleteButton = getByTestId(
    `bookmark-button-${mockedBookmarkedListings[0].id}`
  );
  fireEvent.click(firstReviewDeleteButton);

  const numberOfUpdatedBookmarkedProperties =
    getAllByTestId("listing-preview").length;
  expect(numberOfUpdatedBookmarkedProperties).toBe(
    mockedBookmarkedListings.length - 1
  );
});

test("unbookmarking a bookmarked property removes the correct property from the list of bookmarked properties", () => {
  const { getByTestId, getAllByTestId } = render(
    <MockedDataProvider>
      <Bookmarks />
    </MockedDataProvider>
  );

  const numberOfBookmarkedProperties = getAllByTestId("listing-preview").length;
  expect(numberOfBookmarkedProperties).toBe(mockedBookmarkedListings.length);

  const firstReviewDeleteButton = getByTestId(
    `bookmark-button-${mockedBookmarkedListings[0].id}`
  );
  fireEvent.click(firstReviewDeleteButton);

  const numberOfUpdatedBookmarkedProperties =
    getAllByTestId("listing-preview").length;
  expect(numberOfUpdatedBookmarkedProperties).toBe(
    mockedBookmarkedListings.length - 1
  );

  const secondReviewDeleteButton = getByTestId(
    `bookmark-button-${mockedBookmarkedListings[1].id}`
  );
  expect(secondReviewDeleteButton).toBeInTheDocument;
});

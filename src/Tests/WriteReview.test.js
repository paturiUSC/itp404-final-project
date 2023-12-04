import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WriteReview from "../Routes/WriteReview";
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
  },
];

const MockedDataProvider = ({ children }) => {
  useLoaderData.mockReturnValue(mockedBookmarkedListings);
  return <BrowserRouter>{children}</BrowserRouter>;
};

jest.mock("../api", () => ({
  saveReview: jest.fn(() => Promise.resolve()),
}));

test("pressing the reset button resets the form to its initial state", () => {
  const { getByTestId } = render(
    <MockedDataProvider>
      <WriteReview />
    </MockedDataProvider>
  );

  const reviewedPropertyName = getByTestId("property-name");
  fireEvent.change(reviewedPropertyName, {
    target: { value: "2" },
  });
  const reviewerFirstName = getByTestId("reviewer-first-name");
  fireEvent.change(reviewerFirstName, {
    target: { value: "Abhi" },
  });
  const reviewerLastName = getByTestId("reviewer-last-name");
  fireEvent.change(reviewerLastName, {
    target: { value: "Jay" },
  });
  const reviewerClass = getByTestId("Class");
  fireEvent.change(reviewerClass, {
    target: { value: "sophomore" },
  });
  const reviewerRating = getByTestId("Rating");
  fireEvent.change(reviewerRating, { target: { value: "5" } });
  const reviewerComments = getByTestId("Review Comments");
  fireEvent.change(reviewerComments, {
    target: { value: "Amazing service and well-kept property!" },
  });

  const resetButton = getByTestId("reset-button");
  fireEvent.click(resetButton);

  expect(reviewedPropertyName.value).toEqual("1");
  expect(reviewerFirstName.value).toEqual("");
  expect(reviewerLastName.value).toEqual("");
  expect(reviewerClass.value).toEqual("Freshman");
  expect(reviewerRating.value).toEqual("5");
  expect(reviewerComments.value).toEqual("");
});

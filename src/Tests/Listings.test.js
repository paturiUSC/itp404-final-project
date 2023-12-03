import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Listings from "../Routes/Listings";
import { BrowserRouter, useLoaderData } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
  NavLink: jest.fn(),
}));

const mockedListings = [
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
  useLoaderData.mockReturnValue(mockedListings);
  return <BrowserRouter>{children}</BrowserRouter>;
};

test("loading the correct number of listings", () => {
  const { getAllByTestId } = render(
    <MockedDataProvider>
      <Listings />
    </MockedDataProvider>
  );

  const numberOfRenderedListings = getAllByTestId("listing-preview").length;
  expect(numberOfRenderedListings).toBe(mockedListings.length);
});

test("filtering the listings via the search bar", () => {
  const { getByTestId, getAllByTestId } = render(
    <MockedDataProvider>
      <Listings />
    </MockedDataProvider>
  );

  const numberOfRenderedListingsWithoutSearchInput =
    getAllByTestId("listing-preview").length;
  expect(numberOfRenderedListingsWithoutSearchInput).toBe(
    mockedListings.length
  );

  const searchInputText = getByTestId("input-text");

  const searchInputTextValue = "Adams";
  fireEvent.change(searchInputText, {
    target: { value: searchInputTextValue },
  });

  const numberOfActualFilteredListings = mockedListings.filter((listing) =>
    listing.address.includes(searchInputTextValue)
  ).length;

  const numberOfFilteredListings = getAllByTestId("listing-preview").length;
  expect(numberOfFilteredListings).toBe(numberOfActualFilteredListings);
});

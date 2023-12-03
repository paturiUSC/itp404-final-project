import ListingPreview from "../Routes/ListingPreview";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { splitAddress } from "../widelyUsedFunctions";

test("rendering Listing Preview component with all critical information", () => {
  const id = 1;
  const bookmarked = false;
  const address = "123 Main St, Los Angeles, CA 90007";
  const bedrooms = "2";
  const bathrooms = "2";
  const rent = "1500";
  const distance = "0.5";
  const propertyImg = "";
  const bookmarkIcon = "unbookmarked";
  const unbookmarkIcon = "bookmarked";
  const { getByTestId } = render(
    <MemoryRouter>
      <ListingPreview
        id={id}
        bookmarked={bookmarked}
        address={address}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        rent={rent}
        distance={distance}
        propertyImg={propertyImg}
        onClick={jest.fn()}
        bookmarkedIcon={bookmarkIcon}
        unbookmarkedIcon={unbookmarkIcon}
      />
    </MemoryRouter>
  );

  expect(getByTestId(`listing-preview`)).toBeInTheDocument();
  expect(getByTestId("address-first-part")).toHaveTextContent(
    splitAddress(address)[0]
  );
  expect(getByTestId("address-second-part")).toHaveTextContent(
    splitAddress(address)[1].trim()
  );
  expect(getByTestId("property-rent")).toHaveTextContent(`$${rent}`);
  expect(getByTestId("property-distance-in-miles")).toHaveTextContent(
    `${distance} mi`
  );
  expect(getByTestId("property-bed-bath")).toHaveTextContent(
    `Bed: ${bedrooms} | Bath: ${bathrooms}`
  );

  const bookmarkButtonElement = getByTestId(`bookmark-button-${id}`);
  expect(bookmarkButtonElement).toHaveTextContent("bookmarked");
});

test("bookmarking Listing Preview component that is not yet bookmarked", () => {
  const id = 1;
  const bookmarked = false;
  const address = "123 Main St, Los Angeles, CA 90007";
  const bedrooms = "2";
  const bathrooms = "2";
  const rent = "1500";
  const distance = "0.5";
  const propertyImg = "";
  const bookmarkIcon = "unbookmarked";
  const unbookmarkIcon = "bookmarked";
  const onClick = jest.fn();
  const { getByTestId } = render(
    <MemoryRouter>
      <ListingPreview
        id={id}
        bookmarked={bookmarked}
        address={address}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        rent={rent}
        distance={distance}
        propertyImg={propertyImg}
        onClick={onClick}
        bookmarkedIcon={bookmarkIcon}
        unbookmarkedIcon={unbookmarkIcon}
      />
    </MemoryRouter>
  );

  const bookmarkButtonElement = getByTestId(`bookmark-button-${id}`);
  expect(bookmarkButtonElement).toHaveTextContent("bookmarked");
  fireEvent.click(bookmarkButtonElement);
  expect(onClick).toHaveBeenCalledWith(id, bookmarked);
  expect(bookmarkButtonElement).toHaveTextContent("unbookmarked");
});

test("unbookmarking Listing Preview component that is already bookmarked", () => {
  const id = 1;
  const bookmarked = true;
  const address = "123 Main St, Los Angeles, CA 90007";
  const bedrooms = "2";
  const bathrooms = "2";
  const rent = "1500";
  const distance = "0.5";
  const propertyImg = "";
  const bookmarkIcon = "unbookmarked";
  const unbookmarkIcon = "bookmarked";
  const onClick = jest.fn();
  const { getByTestId } = render(
    <MemoryRouter>
      <ListingPreview
        id={id}
        bookmarked={bookmarked}
        address={address}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        rent={rent}
        distance={distance}
        propertyImg={propertyImg}
        onClick={onClick}
        bookmarkedIcon={bookmarkIcon}
        unbookmarkedIcon={unbookmarkIcon}
      />
    </MemoryRouter>
  );

  const bookmarkButtonElement = getByTestId(`bookmark-button-${id}`);
  expect(bookmarkButtonElement).toHaveTextContent("unbookmarked");
  fireEvent.click(bookmarkButtonElement);
  expect(onClick).toHaveBeenCalledWith(id, bookmarked);
  expect(bookmarkButtonElement).toHaveTextContent("bookmarked");
});

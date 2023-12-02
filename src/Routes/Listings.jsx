import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import ListingPreview from "./ListingPreview";
import { saveBookmark } from "../api";
import "../CSS/Listings.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputText from "../Form/InputText";

export default function Listings() {
  const loadedListings = useLoaderData();
  console.log(loadedListings);

  const [filteredListings, setFilteredListings] = useState(loadedListings);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    document.title = `UniNest: Listings`;
  }, []);

  return (
    <div className="container custom-font-listings">
      <InputText
        id={"listingSearch"}
        value={userInput}
        placeholder={"Search By Address..."}
        onChange={(event) => {
          const identifiedUserInput = event.target.value;

          setUserInput(identifiedUserInput);

          if (identifiedUserInput !== "") {
            const newFilteredListings = loadedListings.filter((listing) => {
              return listing.address
                .toLowerCase()
                .includes(identifiedUserInput.toLowerCase());
            });
            setFilteredListings(newFilteredListings);
          } else {
            setFilteredListings(loadedListings);
          }
        }}
      />
      {/* <input
        className="w-100"
        type="text"
        value={userInput}
        placeholder="Search Property By Address..."
        onChange={(event) => {
          const identifiedUserInput = event.target.value;

          setUserInput(identifiedUserInput);

          if (identifiedUserInput !== "") {
            const newFilteredListings = loadedListings.filter((listing) => {
              return listing.address
                .toLowerCase()
                .includes(identifiedUserInput.toLowerCase());
            });
            setFilteredListings(newFilteredListings);
          } else {
            setFilteredListings(loadedListings);
          }
        }}
      /> */}
      <div className="row">
        {filteredListings.map((listing) => (
          <ListingPreview
            key={listing.id}
            id={listing.id}
            address={listing.address}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            rent={listing.rent}
            propertyImg={listing.propertyImageURL}
            distance={listing.distanceFromVillage}
            bookmarked={listing.bookmarked}
            onClick={(listingId, bookmark) => {
              const updatedBookmarkData = {
                bookmarked: bookmark ? false : true,
              };
              saveBookmark(listingId, updatedBookmarkData).then(
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
            }}
          />
        ))}
      </div>
      <ToastContainer position="bottom-left" autoClose={1000} />
    </div>
  );
}

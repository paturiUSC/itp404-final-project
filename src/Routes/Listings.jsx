import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";
import { saveBookmark } from "../api";
import "../CSS/Listings.css";

export default function Listings()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    const [listings, setListings] = useState(loadedListings);

    return (
        <div className="container custom-font-listings">
            <div className="row">
                    {listings.map((listing) => (
                        <ListingPreview
                            key={listing.id} id={listing.id} address={listing.address} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} rent={listing.rent} propertyImg={listing.propertyImageURL} distance={listing.distanceFromVillage} bookmarked={listing.bookmarked} onClick={(listingId) => {
                                const updatedBookmarkData = {
                                    "bookmarked": listing.bookmarked ? false : true
                                };
                                saveBookmark(listingId, updatedBookmarkData);
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}
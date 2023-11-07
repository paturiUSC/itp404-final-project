import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";
import { saveBookmark } from "../api";
import "../CSS/Listings.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                            key={listing.id} id={listing.id} address={listing.address} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} rent={listing.rent} propertyImg={listing.propertyImageURL} distance={listing.distanceFromVillage} bookmarked={listing.bookmarked} onClick={(listingId, bookmark) => {
                                const updatedBookmarkData = {
                                    "bookmarked": bookmark ? false : true
                                };
                                saveBookmark(listingId, updatedBookmarkData).then(() => {
                                    
                                    bookmark ? toast.success("Successfully unbookmarked the listing."): toast.success("Successfully bookmarked the listing.")
                                }, () => {
                                    bookmark ? toast.error("Unsuccessfully unbookmarked the listing."): toast.error("Unsuccesfully bookmarked the listing. Please try again!");
                                    
                                });
                            }}
                        />
                    ))}
            </div>
            <ToastContainer position="bottom-left" autoClose={1000} />
        </div>
    );
}
import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";
import { saveBookmark } from "../api";
import "../CSS/Bookmarks.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Bookmarks()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    const [listings, setListings] = useState(loadedListings);

    return (
        <div className="container custom-font-bookmarks">
            {
                listings.length > 0 ? (
                    <div className="row">
                            {listings.map((listing) => (
                                <ListingPreview
                                    key={listing.id} id={listing.id} address={listing.address} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} rent={listing.rent} propertyImg={listing.propertyImageURL} distance={listing.distanceFromVillage} bookmarked={listing.bookmarked} onClick={(listingId, bookmark) => {
                                        const updatedBookmarkData = {
                                            "bookmarked": listing.bookmarked ? false : true
                                        };
                                        saveBookmark(listingId, updatedBookmarkData).then(() => {
                                    
                                            bookmark ? toast.success("Successfully unbookmarked the listing."): toast.success("Successfully bookmarked the listing.")
                                        }, () => {
                                            bookmark ? toast.error("Unsuccessfully unbookmarked the listing."): toast.error("Unsuccesfully bookmarked the listing. Please try again!");
                                            
                                        });

                                        const updatedListings = listings.filter((listing) => {
                                            return listing.id !== listingId;
                                        })
                                
                                        setListings(updatedListings);
                                        
                                    }}
                                />
                            ))}
                    </div>
                    ) : (
                        <div>
                            <h4 className="mt-5">No properties have been bookmarked yet. </h4>
                            <h5 className="mt-4">View some properties. Bookmark your favorites to view them later!</h5>
                            <NavLink to="/listings">
                                <button type="submit" className="btn btn-secondary my-3 mb-5 custom-bg-button">
                                    View Listings
                                </button>
                            </NavLink>
                        </div>
                    )
            }
            <ToastContainer position="bottom-left" autoClose={1000} />
        </div>
    );
}
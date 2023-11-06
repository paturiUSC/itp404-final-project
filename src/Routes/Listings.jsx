import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";
import { saveBookmark } from "../api";

export default function Listings()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    const [listings, setListings] = useState(loadedListings);

    // function listOfListings() 
    // {
    //     const listOfListingPreviewObjects = listings.map((listing) => {
    //         return (
    //             <ListingPreview key={listing.id} id={listing.id} address={listing.address} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} rent={listing.rent} propertyImg={listing.propertyImageURL} distance={listing.distanceFromVillage} bookmarked={listing.bookmarked}/>
    //         );
    //     })

    //     return listOfListingPreviewObjects;
    // }

    // function returnRows() 
    // {
    //     const listingsList = listOfListings();
    //     const rowsOfListings = [];

    //     for (let i = 0; i < listingsList.length; i += 3) {
    //         const listingRow = (
    //             <div className="row" key={listingsList[i].props.id}>
    //                 {listingsList[i]}
    //                 {listingsList[i + 1]}
    //                 {listingsList[i + 2]}
    //             </div>
    //         );
    //         rowsOfListings.push(listingRow);
    //     }
    //     return rowsOfListings;
    // }

    return (
        <div className="container">
            <div className="row">
                    {listings.map((listing, index) => (
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
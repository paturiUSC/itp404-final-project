import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";

export default function Bookmarks()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    function listOfListings() 
    {
        const listOfListingPreviewObjects = listings.map((listing) => {
            return (
                <ListingPreview key={listing.id} id={listing.id} address={listing.address} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} rent={listing.rent} propertyImg={listing.propertyImageURL} distance={listing.distanceFromVillage}/>
            );
        })

        return listOfListingPreviewObjects;
    }

    function returnRows() 
    {
        const listingsList = listOfListings();
        const rowsOfListings = [];

        for (let i = 0; i < listingsList.length; i += 3) {
            const listingRow = (
                <div className="row" key={listingsList[i].props.id}>
                    {listingsList[i]}
                    {listingsList[i + 1]}
                    {listingsList[i + 2]}
                </div>
            );
            rowsOfListings.push(listingRow);
        }
        return rowsOfListings;
    }

    const [listings, setListings] = useState(loadedListings);

    return (
        <div className="container custom-font">
            {
                listings.length > 0 ? (
                    returnRows()
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
        </div>
    );
}
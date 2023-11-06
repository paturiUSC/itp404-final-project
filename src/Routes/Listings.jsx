import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ListingPreview from "./ListingPreview";

export default function Listings()
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
        <div className="container">
            {
                returnRows()
            }
        </div>
    );
}
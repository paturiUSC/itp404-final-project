import { useLoaderData, NavLink } from "react-router-dom";
import "../CSS/CompleteListing.css";

export default function CompleteListing() 
{
    const loadedListing = useLoaderData();
    console.log(loadedListing);

    function splitAddress() 
    {
        const splitAddressInfo = [];

        const firstCommaIndex = loadedListing.address.indexOf(",");

        const addressLine = loadedListing.address.substring(0, firstCommaIndex);
        splitAddressInfo.push(addressLine);
        const cityStateZip = loadedListing.address.substring(firstCommaIndex + 1); 
        splitAddressInfo.push(cityStateZip);

        return splitAddressInfo;
    }

    return (
        <div>
            <NavLink className="btn btn-secondary" to="/listings">Back to Complete Listings</NavLink>

            <div className="container mt-4 font-styling">
                <div className="listing-container">
                    <h2>{loadedListing.title}</h2>
                    <p className="address-spacing">{splitAddress()[0]}</p>
                    <p>{splitAddress()[1]}</p>
                    {/* <img src="https://media.apts247.info/e7/e7442b2fab3e4435889200f63d4e088d/hero_shot/community/Lorenzo.jpg" className="listing-image image-spacing" alt="Listing Image" /> */}
                    <div className="d-flex flex-column">
                        <div className="row">
                        {/* <div className="d-flex justify-content-between"> */}
                            <div className="col-7">
                                <img src={loadedListing.propertyImageURL} className="img-fluid w-100" alt="Listing Image" />
                            </div>
                            <div className="card col-5">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <p className="description-styling">Bedrooms: {loadedListing.bedrooms}</p>
                                    <p className="description-styling">Bathrooms: {loadedListing.bathrooms}</p>
                                    <p className="description-styling">Rent: ${loadedListing.rent}</p>
                                    <p className="description-styling">Distance from Village: {loadedListing.distanceFromVillage} miles</p>
                                    <p className="description-styling">Shryft Zone: {loadedListing.shryftZone ? "Yes": "No"}</p>
                                    <p className="description-styling">In-Unit Laundry: {loadedListing.inUnitLaundrt ? "Yes": "No"}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            Reviews Section Here
                        </div>
                    </div>
                    <button className="btn btn-primary">Bookmark</button>
                </div>
            </div>
        </div>
    )
}
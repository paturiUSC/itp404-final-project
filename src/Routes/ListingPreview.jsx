import { Link } from "react-router-dom";
import "../CSS/ListingPreview.css";
import { useState } from "react";
import { saveBookmark } from "../api";

export default function ListingPreview(props)
{
    const [bookmark, setBookmark] = useState(props.bookmarked);

    function splitAddress() 
    {
        const splitAddressInfo = [];

        const firstCommaIndex = props.address.indexOf(",");

        const addressLine = props.address.substring(0, firstCommaIndex);
        splitAddressInfo.push(addressLine);
        const cityStateZip = props.address.substring(firstCommaIndex + 1); 
        splitAddressInfo.push(cityStateZip);

        return splitAddressInfo;
    }
    
    return (
        <div className="mt-4 col-4">
            <div className="card fixed-card">
                <Link to={`/listings/${props.id}`} className="custom-preview-decoration">
                <img src={props.propertyImg} className="card-img-top fixed-image" alt="Listing Image" />
                <div className="card-body d-flex flex-column first-body">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="card-title custom-link">{splitAddress()[0]}</p>
                            <p className="card-title custom-link">{splitAddress()[1]}</p>
                        </div>
                        <p className="card-title custom-link other-description"><span className="other-description-info">${props.rent}</span></p>
                    </div>
                    <p className="card-text other-description">Distance From Village: <span className="other-description-info">{props.distance}</span></p>
                </div>
                </Link>
                <div className="second-body card-body d-flex justify-content-between align-items-center">
                    <div>
                        <p className="card-text other-description ">Bedrooms: <span className="other-description-info">{props.bedrooms}</span> | Bathrooms: <span className="other-description-info">{props.bathrooms}</span></p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-format"  onClick={() => {
                        const updatedBookmarkData = {
                            "bookmarked": bookmark ? false : true
                        };

                        saveBookmark(props.id, updatedBookmarkData);
                        setBookmark(bookmark ? false : true);
                    }}>
                        Bookmark
                    </button>
                </div>
            </div>
        </div>
    );
}
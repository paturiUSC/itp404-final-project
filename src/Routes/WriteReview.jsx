import { useLoaderData } from "react-router-dom";

export default function WriteReview()
{
    const loadedListings = useLoaderData();
    console.log(loadedListings);

    return (
        <div className="container">
            <h1 className="mb-4">Write a Review</h1>

            <div className="my-3">
                <label htmlFor="input" className="form-label">Property Name</label>
                <input id="input" type="text" list="listings" className="form-control"/>

                <datalist id="listings">
                    {loadedListings.map((listing) => {
                        return <option key={listing.listingId} value={listing.title}/>
                    })}
                </datalist>
            </div>

            <div>
                
            </div>
        </div>
    );
}
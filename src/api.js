const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function saveBookmark(listingId, updatedData) {
    return fetch(`${baseUrl}/listings/${listingId}`, {
        method: 'PATCH', 
        body: JSON.stringify(updatedData), 
        headers: {
            'Content-type': "application/json",
        }
    }).then((response) => {
        return response.json();
    });
}

export function saveReview(data) {
    return fetch(`${baseUrl}/reviews`, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: {
            'Content-type': "application/json",
        }
    }).then((response) => {
        return response.json();
    });
}

export function deleteReview(reviewId) {
    return fetch(
        `${baseUrl}/reviews/${reviewId}`, {
            method: "DELETE",
        }
      )
}
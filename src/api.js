const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function saveBookmark(listingId, updatedData) {
  return fetch(`${baseUrl}/listings/${listingId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveReview(data) {
  return fetch(`${baseUrl}/reviews`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteReview(reviewId) {
  return fetch(`${baseUrl}/reviews/${reviewId}`, {
    method: "DELETE",
  });
}

export function fetchListings() {
  return fetch(`${baseUrl}/listings`).then((response) => {
    return response.json();
  });
}

export function fetchBookmarkedListings() {
  return fetch(`${baseUrl}/listings`)
    .then((response) => {
      return response.json();
    })
    .then((listings) => {
      const correctListings = listings.filter((listing) => {
        return listing.bookmarked === true;
      });

      return correctListings;
    });
}

export function fetchListingById(listingId) {
  return fetch(`${baseUrl}/listings/${listingId}?_embed=reviews`).then(
    (response) => {
      return response.json();
    }
  );
}

export function fetchReviews() {
  return fetch(`${baseUrl}/reviews`).then((response) => {
    return response.json();
  });
}

export function fetchReviewById(reviewId) {
  return fetch(`${baseUrl}/reviews/${reviewId}`).then((response) => {
    return response.json();
  });
}

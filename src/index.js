import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

import Index from "./Routes/Index";
import Root from "./Routes/Root";
import Bookmarks from "./Routes/Bookmarks";
import WriteReview from "./Routes/WriteReview";
import Listings from "./Routes/Listings";
import CompleteListing from "./Routes/CompleteListing";
import Admin from "./Routes/Admin";
import {
  fetchBookmarkedListings,
  fetchListingById,
  fetchListings,
  fetchReviewById,
  fetchReviews,
} from "./api";
import CompleteReview from "./Routes/CompleteReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/listings",
        element: <Listings />,
        loader() {
          return fetchListings();
        },
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
        loader() {
          return fetchBookmarkedListings();
        },
      },
      {
        path: "/writeReview",
        element: <WriteReview />,
        loader() {
          return fetchListings();
        },
      },
      {
        path: "/listings/:listingId",
        element: <CompleteListing />,
        loader(loaderData) {
          return fetchListingById(loaderData.params.listingId);
        },
      },
      {
        path: "/admin",
        element: <Admin />,
        loader() {
          return fetchReviews();
        },
      },
      {
        path: "/reviews/:reviewId",
        element: <CompleteReview />,
        loader(loaderData) {
          return fetchReviewById(loaderData.params.reviewId);
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

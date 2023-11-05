import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import './index.css';

import Index from './Routes/Index';
import Root from './Routes/Root';
import Bookmarks from './Routes/Bookmarks';
import WriteReview from './Routes/WriteReview';
import Listings from './Routes/Listings';
import CompleteListing from './Routes/CompleteListing';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: 
    [
      {
        path: "/", 
        element: <Index />
      }, 
      {
        path: "/listings", 
        element: <Listings />, 
        loader() {
          return fetch(
            `${baseUrl}/listings`
          ).then((response) => {
            return response.json();
          })
        }
      },
      {
        path: "/bookmarks", 
        element: <Bookmarks />, 
        loader(loaderData) {
          return fetch(
            `${baseUrl}/listings`
          ).then((response) => {
            return response.json();
          }).then((listings) => {
            const correctListings = listings.filter((listing) => {
              return listing.bookmarked === true;
            })

            return correctListings;
          })
        }
      }, 
      {
        path: "/writeReview", 
        element: <WriteReview />, 
        loader() {
          return fetch(
            `${baseUrl}/listings`
          ).then((response) => {
            return response.json();
          })
        }
      }, 
      {
        path: "/listings/:listingId", 
        element: <CompleteListing />, 
        loader(loaderData) {
          return fetch(
            `${baseUrl}/listings`
          ).then((response) => {
            return response.json();
          }).then((listings) => {
            const correctListing = listings.filter((listing) => {
              return parseInt(listing.listingId) === parseInt(loaderData.params.listingId);
            })

            return correctListing[0];
          })
        }
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

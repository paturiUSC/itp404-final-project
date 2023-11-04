import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import './index.css';

import Index from './Routes/Index';
import Root from './Routes/Root';
import Bookmarks from './Routes/Bookmarks';
import WriteReview from './Routes/WriteReview';
import Listings from './Routes/Listings';


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
        element: <Listings />
      },
      {
        path: "/bookmarks", 
        element: <Bookmarks />
      }, 
      {
        path: "/writeReview", 
        element: <WriteReview />
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Pages
import Home from './Pages/Home';

// Styles
import './Styles/Global-Rules/global-rules.css';
import './Styles/home/home.css';

// Components Styles
import './Styles/Components-Styles/Header/header.css';


const router = createBrowserRouter([
  {path: "/", element: <Home/>,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
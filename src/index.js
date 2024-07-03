import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Store from './Pages/Store';
import Customers from './Pages/Customers';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AdminPage from './Pages/Admin';
import ProductPage from './Pages/ProductPage';
import ProfilePage from './Pages/ProfilePage';

// Styles
import './Styles/all.min.css'; // Fot FontAwesome
import './Styles/Global-Rules/global-rules.css';
import './Styles/home/home.css';
import './Styles/About/about.css';
import './Styles/Store/store.css';
import './Styles/Customers/customers.css';
import './Styles/Signup-Login/signup.css';
import './Styles/Profile-Page/profile-page.css';
import './Styles/Admin-Page/admin-page.css';

// Components Styles
import './Styles/Components-Styles/ProductPage/productPage.css'

const router = createBrowserRouter([
  {path: "/", element: <Home/>,},
  {path: "About", element: <About/>,},
  {path: "Store", element: <Store/>,},
  {path: "Customers", element: <Customers/>,},
  {path: "Login", element: <Login/>,},
  {path: "Signup", element: <Signup/>,},
  {path: "AdminPage", element: <AdminPage/>,},
  {path: "product/:id", element: <ProductPage/>,},
  {path: "ProfilePage", element: <ProfilePage/>,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
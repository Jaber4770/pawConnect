import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/Pet-Listing/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                path: '/',
                index: true,
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/pet-listing',
                element: <PetListing></PetListing>
            },
            {
                path: '/donation-campaigns',
                element: <DonationCampaigns></DonationCampaigns>
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
]);
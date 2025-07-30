import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/Pet-Listing/PetListing";
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PetDetails from "../Pages/PetDetails/PetDetails";
import DonationDetailsPage from "../Pages/DonationCampaigns/DonationDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Add_a_pet from "../Pages/Dashboard/Add_a_pet/Add_a_pet";
import My_Added_Pet from "../Pages/Dashboard/My_Added_Pet/My_Added_Pet";
import Addoption_Request from "../Pages/Dashboard/Addoption_Request/Addoption_Request";
import Create_Donation_Campaign from "../Pages/Dashboard/Create_Donation_Campaign/Create_Donation_Campaign";
import My_Donation_Campaign from "../Pages/Dashboard/My_Donation_Campaign/My_Donation_Campaign";
import My_Donation from "../Pages/Dashboard/My_Donation/My_Donation";
import All_Pets from "../Pages/Dashboard/All_Pets/All_Pets";
import All_Donation from "../Pages/Dashboard/All_Donation/All_Donation";
import Users from "../Pages/Dashboard/Users/Users";
import UserProfile from "../Pages/UserProfile/UserProfile";
import PrivateRoute from "../Route/PrivateRoute";
import AdminRoute from "../Route/AdminRoute";

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
            },
            {
                path: '/pet-details/:id',
                element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>
            },
            {
                path: '/DonationDetailsPage/:id',
                element: <PrivateRoute><DonationDetailsPage></DonationDetailsPage></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
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
    {
        path: "/",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                index: true,
                element:<Dashboard></Dashboard>
            },
            {
                path: '/add-a-pet',
                element:<Add_a_pet></Add_a_pet>
            },
            {
                path: '/my-added-pets',
                element:<My_Added_Pet></My_Added_Pet>
            },
            {
                path: '/adoption-request',
                element:<Addoption_Request></Addoption_Request>
            },
            {
                path: '/create-donation-campaign',
                element:<Create_Donation_Campaign></Create_Donation_Campaign>
            },
            {
                path: '/my-donation-campaigns',
                element:<My_Donation_Campaign></My_Donation_Campaign>
            },
            {
                path: '/my-donations',
                element:<My_Donation></My_Donation>
            },
            {
                path: '/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: '/all-pets',
                element: <AdminRoute><All_Pets></All_Pets></AdminRoute>
            },
            {
                path: '/all-donations',
                element: <AdminRoute><All_Donation></All_Donation></AdminRoute>
            },
        ]

    }
]);
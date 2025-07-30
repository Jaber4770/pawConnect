import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const DonationDetailsPage = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axios = useAxios();
    // donation related variable
    const [donationAmount, setDonationAmount] = useState(10);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // that should be in env file 
    const stripePromise = loadStripe("pk_test_51Rf2kNGg7l7zI9yu7qa25QbTxCv7bK6KqvOlhwjcKouWZifNDtoKZmH9lQjzcPFJPWJ0hFfA52Uow0FfHyiwuCOu00iPEvpvpw"); 

    const handleSuccess = () => {
        setSuccessMessage("Thank you for your donation!");
        setErrorMessage("");
    };

    const handleError = (msg) => {
        setErrorMessage(msg);
        setSuccessMessage("");
    };


    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`/donation-campaign/${id}`);
                const data = response.data;

                if (!data) throw new Error("Campaign not found");

                setCampaign(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;
    if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
    if (!campaign) return <div className="p-10 text-center text-red-600 text-xl">Campaign not found</div>;

    // Calculate progress %
    const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100).toFixed(2);

    // Format date nicely
    const formattedDate = new Date(campaign.lastDate).toLocaleDateString();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                    src={campaign.petImage}
                    alt={campaign.title}
                    className="w-full object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-orange-600 mb-4">{campaign.title}</h1>
                    <p className="text-gray-700 text-sm mb-4">Pet Name: {campaign?.petName}</p>
                    <p className="text-gray-700 text-sm mb-4">{campaign.description}</p>

                    <div className="mb-4">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                            <span>Raised: ${campaign.raised}</span>
                            <span>Goal: ${campaign.goal}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-orange-500 h-3 rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-2">Category: {campaign.category}</div>
                    <div className="text-sm text-gray-500 mb-6">Last Date: {formattedDate}</div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition"
                    >
                        Donate Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 max-w-lg p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-orange-600">{campaign.title}</h2>
                        <img
                            src={campaign.petImage}
                            alt={campaign.title}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <p className="text-sm text-gray-700">{campaign.longDescription}</p>
                        <p className="mt-4 text-sm text-gray-700">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Donation Amount (Max: ${campaign.maxDonation || 1000})
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={campaign.maxDonation || 1000}
                                    value={donationAmount}
                                    onChange={(e) =>
                                        setDonationAmount(Math.min(Number(e.target.value), campaign.maxDonation || 1000))
                                    }
                                    className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                                />

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm amount={donationAmount} onSuccess={handleSuccess} onError={handleError} />
                                </Elements>

                                {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
                                {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
                                {/* {console.log(errorMessage)} */}
                            </div>

                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationDetailsPage;

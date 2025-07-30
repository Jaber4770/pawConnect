import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useParams } from "react-router";

const CheckoutForm = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axios = useAxios();
    const { id } = useParams();

    const [campaignData, setCampaignData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    // ✅ Fetch campaign data using useEffect
    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`/donation-campaign/${id}`);
                setCampaignData(response.data);
            } catch (error) {
                console.error("Failed to fetch campaign:", error);
                setFetchError("Failed to load campaign data.");
            }
        };
        fetchCampaign();
    }, [id, axios]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        const cardElement = elements.getElement(CardElement);

        try {
            const response = await axios.post("/create-payment-intent", {
                amount: amount * 100
            });
            const clientSecret = response.data.clientSecret;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement }
            });

            if (error) {
                onError(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                const paymentData = {
                    name: user?.displayName || "Anonymous",
                    email: user?.email,
                    amount,
                    paymentId: paymentIntent.id,
                    campaignId: campaignData?._id || "UNKNOWN",
                    petName: campaignData?.petName || "N/A",
                    petImage: campaignData?.petImage || "N/A",
                    status: paymentIntent.status,
                    created: paymentIntent.created,
                };

                try {
                    await axios.post("/donation-record", paymentData);
                    onSuccess();
                    cardElement.clear();
                } catch (err) {
                    console.error("Error saving payment to DB:", err);
                    onError("Payment succeeded but failed to log donation.");
                }
            } else {
                onError("Payment failed or incomplete.");
            }
        } catch (error) {
            onError(error.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {fetchError && <p className="text-red-500">{fetchError}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Processing..." : `Pay $${amount}`}
                </button>
            </form>
        </>
    );
};

export default CheckoutForm;

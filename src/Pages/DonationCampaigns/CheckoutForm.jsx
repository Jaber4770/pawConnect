import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    // Call hook at top level
    const axios = useAxios();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            // Use axios from hook here
            const response = await axios.post("/create-payment-intent", {
                amount: amount * 100  // Convert dollars to cents
            });
            const clientSecret = response.data.clientSecret;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement }
            });

            // need to send data to db: paymentIntent

            if (error) {
                onError(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                const paymentData = {
                    name: user?.name,
                    email: user?.email,
                    amount,
                    paymentId: paymentIntent.id,
                    campaignId: paymentIntent.metadata?.campaignId || "UNKNOWN",
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
                
                onSuccess();
                cardElement.clear();
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
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
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
    );
};

export default CheckoutForm;

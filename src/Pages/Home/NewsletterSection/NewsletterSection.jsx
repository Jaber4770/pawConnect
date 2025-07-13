import React from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';

const NewsletterSection = () => {
    return (
        <section className="bg-orange-50 py-12 px-4 md:px-8 rounded-2xl mb-12">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-4 text-orange-500 text-4xl">
                    <FaEnvelopeOpenText />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Subscribe to Our Newsletter
                </h2>

                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Stay updated with the latest pet adoption opportunities, donation campaigns, rescue stories, and more!
                </p>

                <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;

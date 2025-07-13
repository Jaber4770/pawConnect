import React from 'react';
import adoptionFair from "../../../assets/adoption-fair.webp";
import fundrise from "../../../assets/fundrise.jpeg";
import awarenessWalking from "../../../assets/awarenessWalking.jpg";

const events = [
    {
        id: 1,
        title: 'Spring Adoption Fair',
        date: 'May 12, 2025',
        location: 'Central Park, NY',
        description: 'Meet loving pets ready to find a home. Enjoy games, treats, and adoption support.',
        image: adoptionFair,
        urgent: false,
    },
    {
        id: 2,
        title: 'Fundraiser for Rescue Shelter',
        date: 'June 3, 2025',
        location: 'Community Hall',
        description: 'Help us raise funds for medical care, shelter improvements, and food supplies.',
        image: fundrise ,
        urgent: true,
    },
    {
        id: 3,
        title: 'Lost & Found Awareness Walk',
        date: 'July 15, 2025',
        location: 'Downtown',
        description: 'Join our walk and spread awareness to reunite lost pets with families.',
        image: awarenessWalking,
        urgent: false,
    },
];

const EventsCampaigns = () => {
    return (
        <section className="py-16 bg-orange-50 my-12 rounded-2xl">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
                    Upcoming Events & Campaigns
                </h2>

                <div className="space-y-16">
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image */}
                            <div className="md:w-1/2">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="rounded-lg shadow-md w-full h-64 object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="md:w-1/2 space-y-4">
                                <h3 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                                    {event.title}
                                    {event.urgent && (
                                        <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                            Urgent
                                        </span>
                                    )}
                                </h3>
                                <p className="text-gray-700">
                                    <strong>Date:</strong> {event.date}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p className="text-gray-800">{event.description}</p>
                                <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsCampaigns;

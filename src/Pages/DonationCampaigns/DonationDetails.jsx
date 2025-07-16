import React, { useState } from 'react';
import { useParams } from 'react-router';

const allCampaigns = [
    {
        id: 1,
        title: 'Help Max the Dog Get Surgery',
        category: 'Pet',
        image: 'https://place-puppy.com/500x300',
        description: 'Max needs urgent surgery. Help us save his life!',
        date: '2025-07-13',
        targetAmount: 1000,
        donatedAmount: 450,
    },
    {
        id: 2,
        title: 'Rescue Mission: Flood Affected Animals',
        category: 'Rescue',
        image: 'https://placekitten.com/500/300',
        description: 'Help rescue and feed animals affected by floods.',
        date: '2025-07-12',
        targetAmount: 2000,
        donatedAmount: 1250,
    },
    {
        id: 3,
        title: 'Build a Shelter for Stray Dogs',
        category: 'Other',
        image: 'https://placebear.com/500/300',
        description: 'We are building a safe haven for 50+ homeless dogs.',
        date: '2025-07-11',
        targetAmount: 5000,
        donatedAmount: 4300,
    },
    {
        id: 4,
        title: 'Vaccination Drive for Street Cats',
        category: 'Pet',
        image: 'https://placekitten.com/501/300',
        description: 'Help us vaccinate and care for 100+ street cats.',
        date: '2025-07-10',
        targetAmount: 1500,
        donatedAmount: 400,
    },
    {
        id: 5,
        title: 'Animal Rescue Ambulance Fund',
        category: 'Rescue',
        image: 'https://placebear.com/501/300',
        description: 'We need a dedicated ambulance for emergency rescues.',
        date: '2025-07-09',
        targetAmount: 8000,
        donatedAmount: 2600,
    },
    {
        id: 6,
        title: 'Feed the Forgotten Farm Animals',
        category: 'Other',
        image: 'https://place-puppy.com/501x300',
        description: 'Drought-hit farms need help feeding their animals.',
        date: '2025-07-08',
        targetAmount: 3000,
        donatedAmount: 1800,
    },
];

const DonationDetailsPage = () => {
    const { id } = useParams();
    const campaign = allCampaigns.find(c => c.id === parseInt(id));
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!campaign) {
        return <div className="p-10 text-center text-red-600 text-xl">Campaign not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 relative">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">{campaign.title}</h1>
            <img src={campaign.image} alt={campaign.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-sm text-gray-600 mb-2">
                {campaign.description}
            </p>

            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Raised: ${campaign.donatedAmount}</span>
                    <span>Goal: ${campaign.targetAmount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(campaign.donatedAmount / campaign.targetAmount) * 100}%` }}
                    ></div>
                </div>
            </div>

            <p className="text-sm text-gray-500">Category: {campaign.category}</p>
            <p className="text-sm text-gray-500 mb-4">Date: {campaign.date}</p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-sm border border-[#ff9416] text-[#ff9416] hover:shadow-lg hover:text-white hover:bg-[#ff9416] transition duration-300"
            >
                Donate Now
            </button>

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
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <p className="text-sm text-gray-700">[ Payment form or details can go here ]</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationDetailsPage;

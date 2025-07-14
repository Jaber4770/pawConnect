import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spinner from '../../Shared/Loader/Spinner';

const allCampaigns = [
    {
        id: 1,
        title: 'Help Max the Dog Get Surgery',
        category: 'Pet',
        image: 'https://place-puppy.com/500x300',
        raised: 450,
        goal: 1000,
        description: 'Max needs urgent surgery. Help us save his life!',
        date: '2025-07-13',
    },
    {
        id: 2,
        title: 'Rescue Mission: Flood Affected Animals',
        category: 'Rescue',
        image: 'https://placekitten.com/500/300',
        raised: 3200,
        goal: 5000,
        description: 'Help rescue and feed animals affected by floods.',
        date: '2025-07-12',
    },
    {
        id: 3,
        title: 'Build a Shelter for Stray Dogs',
        category: 'Other',
        image: 'https://placebear.com/500/300',
        raised: 2000,
        goal: 5000,
        description: 'We are building a safe haven for 50+ homeless dogs.',
        date: '2025-07-11',
    },
    {
        id: 4,
        title: 'Vaccination Drive for Street Cats',
        category: 'Pet',
        image: 'https://placekitten.com/501/300',
        raised: 800,
        goal: 2000,
        description: 'Help us vaccinate and care for 100+ street cats.',
        date: '2025-07-10',
    },
    {
        id: 5,
        title: 'Animal Rescue Ambulance Fund',
        category: 'Rescue',
        image: 'https://placebear.com/501/300',
        raised: 1500,
        goal: 4000,
        description: 'We need a dedicated ambulance for emergency rescues.',
        date: '2025-07-09',
    },
    {
        id: 6,
        title: 'Feed the Forgotten Farm Animals',
        category: 'Other',
        image: 'https://place-puppy.com/501x300',
        raised: 900,
        goal: 3000,
        description: 'Drought-hit farms need help feeding their animals.',
        date: '2025-07-08',
    },
];

const ITEMS_PER_LOAD = 3;

const DonationCampaigns = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [displayedCampaigns, setDisplayedCampaigns] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // loading state
    const loadIndexRef = useRef(0);

    // Filter and sort campaigns by category and date
    const getFilteredSortedCampaigns = useCallback(() => {
        return allCampaigns
            .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [selectedCategory]);

    // Load more campaigns on scroll
    const loadMore = useCallback(() => {
        if (loading) return; // Prevent multiple loads

        setLoading(true);

        setTimeout(() => {
            const campaigns = getFilteredSortedCampaigns();
            const total = campaigns.length;

            let start = loadIndexRef.current;
            let end = start + ITEMS_PER_LOAD;

            let nextBatch = [];

            if (end <= total) {
                // Normal slice when not reaching the end
                nextBatch = campaigns.slice(start, end);
            } else {
                // If end exceeds total, slice till end and wrap from start again
                nextBatch = [
                    ...campaigns.slice(start, total),
                    ...campaigns.slice(0, end - total),
                ];
            }

            setDisplayedCampaigns(prev => [...prev, ...nextBatch]);

            // Update the load index wrapping around total length
            loadIndexRef.current = end % total;

            setLoading(false);
        }, 800); // simulate network delay
    }, [getFilteredSortedCampaigns, loading]);

    // Reset campaigns when category changes
    useEffect(() => {
        loadIndexRef.current = 0;
        const campaigns = getFilteredSortedCampaigns();
        const initialItems = campaigns.slice(0, ITEMS_PER_LOAD);
        setDisplayedCampaigns(initialItems);
        setHasMore(ITEMS_PER_LOAD < campaigns.length);
    }, [selectedCategory, getFilteredSortedCampaigns]);

    // Scroll event listener to trigger loading more campaigns
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY + 100 >=
                document.documentElement.scrollHeight
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Hero */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-orange-500 mb-4">
                    Support Our Campaigns
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Make a difference by contributing to our ongoing pet, rescue, and animal welfare
                    initiatives.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-4 mb-8">
                {['All', 'Pet', 'Rescue', 'Other'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === category
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-orange-100'
                            } transition`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Campaigns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCampaigns.map(campaign => {
                    const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
                    return (
                        <div
                            key={campaign.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                        >
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-orange-600 mb-2">
                                    {campaign.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">
                                    {campaign.description}
                                </p>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="h-3 w-full bg-gray-200 rounded-full">
                                        <div
                                            className="h-3 bg-orange-500 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Raised ${campaign.raised} of ${campaign.goal}
                                    </p>
                                </div>

                                {/* Donate Button */}
                                <button className="mt-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="text-center mt-6 text-orange-500 font-semibold">
                    <Spinner></Spinner>
                </div>
            )}
        </div>
    );
};

export default DonationCampaigns;

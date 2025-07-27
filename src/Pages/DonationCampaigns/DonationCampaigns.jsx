import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Shared/Loader/Spinner';
import { Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';


const ITEMS_PER_LOAD = 3;

const DonationCampaigns = () => {
    const axios = useAxios();
    const fetchCampaigns = async () => {
        const res = await axios.get('/donation-campaign');
        return res.data;
    };


    const { data: allCampaigns = [], isLoading } = useQuery({
        queryKey: ['donation-campaigns'],
        queryFn: fetchCampaigns,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loadCount, setLoadCount] = useState(1);

    const filteredCampaigns = useMemo(() => {
        return allCampaigns
            .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
            .sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
    }, [allCampaigns, selectedCategory]);

    const displayedCampaigns = useMemo(() => {
        return filteredCampaigns.slice(0, loadCount * ITEMS_PER_LOAD);
    }, [filteredCampaigns, loadCount]);

    const loadMore = () => setLoadCount(prev => prev + 1);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-orange-500 mb-4">
                    Support Our Campaigns
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Make a difference by supporting our ongoing pet, rescue, and animal welfare initiatives.
                </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
                {['All', 'Pet', 'Rescue', 'Other'].map(category => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setLoadCount(1);
                        }}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === category
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-orange-100'
                            } transition`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="text-center mt-6 text-orange-500 font-semibold">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedCampaigns.map(campaign => (
                            <div
                                key={campaign._id}
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                <img
                                    src={campaign.petImage}
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
                                    <div className="mt-2 mb-4">
                                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                                            <span>Raised: ${campaign.raised}</span>
                                            <span>Goal: ${campaign.goal}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-orange-500 h-3 rounded-full"
                                                style={{
                                                    width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/DonationDetailsPage/${campaign._id}`}
                                        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-center transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {displayedCampaigns.length < filteredCampaigns.length && (
                        <div className="text-center mt-6">
                            <button
                                onClick={loadMore}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DonationCampaigns;

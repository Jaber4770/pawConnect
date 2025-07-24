import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PetCard from './PetCard';
import { Select, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import Spinner from '../../Shared/Loader/Spinner';
import useAxios from '../../Hooks/useAxios';

export default function PetListing() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('date-desc');
    const axios = useAxios();

    const {
        data,
        refetch,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['pets', { search, category, sort }],
        queryFn: async () => {
            const res = await axios.get('/pet-listing', {
                params: { search, category, sort }
            });
            return res.data;
        },
        staleTime: Infinity
    });

    useEffect(() => {
        refetch();
    }, [search, category, sort, refetch]);

    const pets = data?.pets || [];

    if (isLoading) return <Spinner />;
    if (isError) return <div className="text-red-500 text-center py-10">Failed to load pets</div>;

    return (
        <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">Pet Listing</h1>

            {/* Filters */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                    <label className="font-medium">Sort by:</label>
                    <Select
                        size="small"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="min-w-[150px]"
                    >
                        <MenuItem value="date-desc">Date (Newest)</MenuItem>
                        <MenuItem value="date-asc">Date (Oldest)</MenuItem>
                        <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                        <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                    </Select>
                </div>

                <div className="flex items-center space-x-2 flex-grow max-w-md">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search pets by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded pl-9 pr-3 py-1 w-full"
                        />
                        <Search
                            size={18}
                            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>

                    <Select
                        size="small"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                        className="min-w-[150px]"
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="dogs">Dogs</MenuItem>
                        <MenuItem value="cats">Cats</MenuItem>
                    </Select>
                </div>
            </div>

            {/* Pet grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {pets.map((pet, index) => (
                    <PetCard
                        key={`${pet._id}-${index}`}
                        pet={pet}
                    />
                ))}
            </div>

            {/* Empty state */}
            {pets.length === 0 && (
                <div className="text-center mt-10 text-gray-500">No pets found.</div>
            )}
        </div>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import PetCard from './PetCard';
import { Select, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import Spinner from '../../Shared/Loader/Spinner';
import useAxios from '../../Hooks/useAxios';

export default function PetListing() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('date-desc');
    const limit = 8;
    const axios = useAxios();

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = useInfiniteQuery({
        queryKey: ['pets', { search, category, sort }],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axios.get('/pet-listing', {
                params: { search, category, sort, page: pageParam, limit }
            });
            return res.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length + 1; // Always increment page number
        },
        staleTime: Infinity // Prevent automatic refetches
    });

    // Combine all pages while removing duplicates
    const pets = React.useMemo(() => {
        const allPets = data?.pages.flatMap(page => page.pets) || [];
        const uniquePets = [];
        const seenIds = new Set();

        for (const pet of allPets) {
            if (!seenIds.has(pet.id)) {
                seenIds.add(pet.id);
                uniquePets.push(pet);
            }
        }

        return uniquePets;
    }, [data]);

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (isFetchingNextPage) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            fetchNextPage();
        }
    }, [fetchNextPage, isFetchingNextPage]);

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Refetch when filters change
    useEffect(() => {
        refetch();
    }, [search, category, sort, refetch]);

    {
        isFetchingNextPage && (
            <div className="flex justify-center my-8">
                <Spinner />
            </div>
        )
    }
    if (status === 'error') return <div className='flex justify-center items-center text-orange-500 min-h-screen'>Failed to load pets</div>;

    return (
        <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">Pet Listing</h1>

            {/* Filters (same as before) */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
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
                                onChange={(e) => setSearch(e.target.value)} // Updates search state
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
            </div>

            {/* Pet grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {pets.map((pet, index) => (
                    <PetCard
                        key={`${pet._id}-${index}-${Math.random().toString(36).substr(2, 9)}`}
                        pet={pet}
                    />
                ))}
            </div>

            {/* Loading spinner at bottom */}
            {isFetchingNextPage && (
                <div className="flex justify-center my-4">
                    <Spinner />
                </div>
            )}

            {/* Empty state */}
            {pets.length === 0 && !isFetchingNextPage && (
                <Spinner></Spinner>
            )}
        </div>
    );
}
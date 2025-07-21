import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { Select, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';
import Spinner from '../../Shared/Loader/Spinner';
import useAxios from '../../Hooks/useAxios';

export default function PetListing() {
    // Filters state
    const [sort, setSort] = useState('date-desc');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    // Data state
    const [petData, setPetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    // Fetch pets function (without infinite scroll)
    const fetchPetList = async () => {
        setLoading(true);
        try {
            // Adjust query params based on filters if your backend supports it
            const res = await axios.get('/pet-listing');
            // console.log(res.data);
            setPetData(res.data); // assuming backend returns array of pets directly
        } catch (error) {
            console.error('Failed to fetch pets', error);
            setPetData([]);
        }
        setLoading(false);
    };

    // Fetch pets once when component mounts or filters change
    useEffect(() => {
        fetchPetList();
    },[]);

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
                            placeholder="Search pets..."
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
                        <MenuItem value="birds">Birds</MenuItem>
                    </Select>
                </div>
            </div>

            {/* Pet cards grid */}
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <Spinner />
                </div>
            ) : petData.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No pets found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {petData.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>
            )}

            {/* 
        // How to implement Infinite Scroll later:
        // 1. Replace useEffect + fetchPetList with useInfiniteQuery from @tanstack/react-query.
        // 2. Fetch pages with queryFn and use fetchNextPage for loading more.
        // 3. Wrap pet cards with <InfiniteScroll> component.
        // 4. Pass fetchNextPage as next prop, and hasNextPage to control loading.
        // 5. Update petData with flattened pages.

        // How to add other features:
        // - Debounce search input to reduce API calls.
        // - Add error UI message on fetch failure.
        // - Add "Load More" button for manual pagination.
      */}
        </div>
    );
}

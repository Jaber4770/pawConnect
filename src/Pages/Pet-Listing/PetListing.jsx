import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import { Select, MenuItem, TextField } from '@mui/material';
import { Search } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../Shared/Loader/Spinner';

// Dummy fetch function (replace with your API call)
const fetchPets = async ({ page, sort, search, category }) => {
    // simulate data and filtering as before or call real API
    return new Promise((resolve) => {
        setTimeout(() => {
            const allPets = Array(100).fill(0).map((_, i) => ({
                id: i + 1,
                name: `Pet ${i + 1}`,
                age: `${1 + (i % 10)} years`,
                location: ['New York', 'LA', 'Chicago'][i % 3],
                category: ['dogs', 'cats', 'birds'][i % 3],
                image: 'https://place-puppy.com/200x200',
                dateAdded: new Date(Date.now() - i * 10000000).toISOString(),
            }));

            let filtered = allPets.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) &&
                (category ? p.category === category : true)
            );

            if (sort === 'date-desc') filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            else if (sort === 'date-asc') filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
            else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
            else if (sort === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

            const pageSize = 20;
            const start = page * pageSize;
            const pets = filtered.slice(start, start + pageSize);
            const hasMore = start + pageSize < filtered.length;

            resolve({ pets, hasMore });
        }, 700);
    });
};

export default function PetListing() {
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('date-desc');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const loadPets = async (reset = false) => {
        setLoading(true);

        let currentPage = reset ? 0 : page;

        const data = await fetchPets({ page: currentPage, sort, search, category });

        if (reset) {
            setPets(data.pets);
            setPage(1);
        } else {
            // If no more pets on next page, reset to 0
            if (!data.hasMore) {
                currentPage = 0;
                const resetData = await fetchPets({ page: currentPage, sort, search, category });
                setPets(prev => [...prev, ...resetData.pets]);
                setPage(1);
            } else {
                setPets(prev => [...prev, ...data.pets]);
                setPage(p => p + 1);
            }
        }

        // Always keep hasMore true for infinite looping
        setHasMore(true);

        setLoading(false);
    };



    // Load pets on mount and when filters change
    useEffect(() => {
        loadPets(true);
    }, [sort, search, category]);

    return (
        <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-500">Pet Listing</h1>

            {/* Controls */}
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

            {/* Pets grid + Infinite scroll */}
            <InfiniteScroll
                dataLength={pets.length}
                next={() => loadPets()}
                hasMore={hasMore}
                loader={
                    <div className="col-span-full flex justify-center items-center py-8">
                        <Spinner />
                    </div>
                }
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
                {pets.map(pet => (
                    <PetCard key={pet.id} pet={pet} />
                ))}
            </InfiniteScroll>


            {!loading && pets.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No pets found.</p>
            )}
        </div>
    );
}

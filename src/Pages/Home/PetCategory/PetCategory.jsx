import React from 'react';
import { FaCat, FaDog, FaFish, FaCrow, FaPaw } from 'react-icons/fa';

const categories = [
    { id: 1, name: 'Cats', icon: <FaCat /> },
    { id: 2, name: 'Dogs', icon: <FaDog /> },
    { id: 3, name: 'Rabbits', icon: <FaCrow /> }, // no rabbit icon, using crow as placeholder
    { id: 4, name: 'Fish', icon: <FaFish /> },
    { id: 5, name: 'Others', icon: <FaPaw /> },
];

const PetCategory = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-[#ff9416] mb-8">Pet Categories</h2>
                <div className="grid grid-cols-5 justify-center gap-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="flex flex-col items-center justify-center py-10 bg-[#ff9416]/20 text-[#ff9416] rounded-xl shadow-md hover:bg-[#ff9416] hover:text-white transition duration-300 hover:scale-105"
                            onClick={() => alert(`Clicked on ${cat.name}`)} // Replace with your logic or link
                        >
                            <div className="mb-2 text-7xl">{cat.icon}</div>
                            <span className="font-semibold text-3xl">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PetCategory;

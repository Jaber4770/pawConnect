import React from 'react';
import { FaPaw } from 'react-icons/fa';

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-40 space-y-4">
            {/* Paw icon */}
            <FaPaw className="text-orange-500 text-7xl animate-bounce" />

            {/* Loading text */}
            <p className="text-gray-600 font-medium">Wait...</p>
        </div>
    );
};

export default Spinner;

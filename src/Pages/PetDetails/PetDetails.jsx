import React, { useState } from 'react';
import AdoptionModal from './AdoptionModal';
// import { useAuth } from '../../hooks/useAuth';

const PetDetails = ({ pet }) => {
    const [modalOpen, setModalOpen] = useState(false);

    // Fallback pet data for testing
    pet = pet || {
        id: 123,
        name: 'Buddy',
        age: '2 years',
        location: 'New York',
        category: 'Dog',
        description: 'Buddy is a friendly and energetic pup looking for a loving home.',
        image: 'https://place-puppy.com/600x400',
        dateAdded: '2025-07-12T10:00:00Z',
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
            </div>

            {/* Info */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold text-orange-500 mb-2">{pet.name}</h1>
                <div className="text-gray-600 mb-4">
                    <span className="mr-4">Age: <strong>{pet.age}</strong></span>
                    <span className="mr-4">Category: <strong>{pet.category}</strong></span>
                    <span>Location: <strong>{pet.location}</strong></span>
                </div>
                <p className="text-gray-700 mb-6">{pet.description}</p>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Added on: {new Date(pet.dateAdded).toLocaleDateString()}
                    </span>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
                    >
                        Adopt Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            <AdoptionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} pet={pet} />
        </div>
    );
};

export default PetDetails;

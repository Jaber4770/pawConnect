import React, { useEffect, useState } from 'react';
import AdoptionModal from './AdoptionModal';
import { Link, useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import Spinner from '../../Shared/Loader/Spinner';
// import { useAuth } from '../../hooks/useAuth';

const PetDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const axios = useAxios();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await axios.get(`/pet/${id}`); // adjust this if needed
                setPet(res.data);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPet();
    }, [id, axios]);

    if (!pet) return <Spinner></Spinner>;


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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Gender:</strong> {pet.gender}</p>
                    <p><strong>Size:</strong> {pet.size}</p>
                    <p><strong>Color:</strong> {pet.color}</p>
                    <p><strong>Good with Kids:</strong> {pet.goodWithKids ? 'Yes' : 'No'}</p>
                    <p><strong>Good with Other Pets:</strong> {pet.goodWithOtherPets ? 'Yes' : 'No'}</p>
                    <p><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
                    <p><strong>Neutered:</strong> {pet.neutered ? 'Yes' : 'No'}</p>
                    <p><strong>Adoption Status:</strong> {pet.adoptionStatus}</p>
                </div>


                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Added on: {new Date(pet.dateAdded).toLocaleDateString()}
                    </span>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
                        >
                            Adopt Now
                        </button>
                        <Link  to={'/pet-listing'}>
                            <button
                                className="bg-gray-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
                            >Go back</button></Link>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AdoptionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} pet={pet} />
        </div>
    );
};

export default PetDetails;

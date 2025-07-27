import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'; // fixed import
import useAxios from '../../Hooks/useAxios';
import Spinner from '../../Shared/Loader/Spinner';
import { Dialog } from '@headlessui/react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PetDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const axios = useAxios();
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();


    const { user } = useAuth(); 
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await axios.get(`/pet/${id}`);
                setPet(res.data);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPet();
    }, [id, axios]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const adoptionData = {
            ...data,
            RequesterName: user?.displayName,
            RequesterEmail: user?.email,
            adoptionStatus: 'Pending',
            requestDate: new Date().toISOString()
        };
        // console.log(adoptionData);
        
        const submitReq = await axios.patch(`/adoption-request/${id}`, adoptionData);
        // console.log(submitReq);

        if (submitReq.data.modifiedCount) {
            Swal.fire({
                icon: "success",
                title: `${submitReq.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/adoption-request')
        }

        onClose();
        reset();
    };

    const onClose = () => {
        setModalOpen(false);
    };

    if (!pet) return <Spinner />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Pet Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img src={pet.image} alt={pet.name} className="w-full object-cover" />
            </div>

            {/* Pet Info */}
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
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition cursor-pointer"
                        >
                            Adopt Now
                        </button>
                        <Link to="/pet-listing">
                            <button className="bg-gray-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition">
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal inside the same file */}
            <Dialog open={modalOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    {/* Replace Dialog.Overlay with div */}
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-50 relative">
                        <Dialog.Title className="text-xl font-bold text-orange-500 mb-4">
                            Adopt {pet.name}
                        </Dialog.Title>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium">Your Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    disabled
                                    className="input input-bordered w-full mt-1 p-2 rounded-lg bg-gray-100"
                                    placeholder="Authenticated user name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="input input-bordered p-2 rounded-lg w-full mt-1 bg-gray-100"
                                    placeholder="Authenticated user email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium">Phone Number</label>
                                <input
                                    {...register('RequesterPhone', { required: true })}
                                    type="tel"
                                    placeholder="Your phone number"
                                    className="input input-bordered w-full mt-1 p-2 rounded-lg bg-gray-100"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <textarea
                                    {...register('RequesterAddress', { required: true })}
                                    placeholder="Your address"
                                    className="textarea textarea-bordered w-full mt-1 p-2 rounded-lg bg-gray-100"
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg transition cursor-pointer"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default PetDetails;

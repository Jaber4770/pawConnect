import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
// import { useAuth } from '../../hooks/useAuth'; // adjust path to your Auth context

export default function AdoptionModal({ isOpen, onClose, pet }) {
    // const { user } = useAuth(); // Should return user.name, user.email

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const adoptionData = {
            ...data,
            petId: pet.id,
            petName: pet.name,
            petImage: pet.image,
            // userName: user.name,
            // userEmail: user.email,
            status: 'pending',
            requestDate: new Date().toISOString()
        };

        // Call your API here
        console.log(adoptionData);
        // await axios.post('/api/adoptions', adoptionData);

        onClose();
        reset();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 z-50 relative">
                    <Dialog.Title className="text-xl font-bold text-orange-500 mb-4">
                        Adopt {pet.name}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* User Name */}
                        <div>
                            <label className="block text-sm font-medium">Your Name</label>
                            <input
                                type="text"
                                // value={user.name}
                                disabled
                                className="input input-bordered w-full mt-1 bg-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                // value={user.email}
                                disabled
                                className="input input-bordered w-full mt-1 bg-gray-100"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium">Phone Number</label>
                            <input
                                {...register('phone', { required: true })}
                                type="tel"
                                placeholder="Your phone number"
                                className="input input-bordered w-full mt-1"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <textarea
                                {...register('address', { required: true })}
                                placeholder="Your address"
                                className="textarea textarea-bordered w-full mt-1"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
}

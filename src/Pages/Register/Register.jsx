import React, { useState } from 'react';
import petImage from '../../assets/pet-login.png';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        // Set updated form data
        setFormData(updatedData);

        // Check password match on each keystroke
        if (
            name === 'password' ||
            name === 'confirmPassword'
        ) {
            if (
                updatedData.confirmPassword &&
                updatedData.password !== updatedData.confirmPassword
            ) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (passwordError) return; // prevent form submission if error

        const { name, email, password } = formData;
        console.log('Register clicked!', name, email, password);

        // proceed with submission
        createUser(email, password)
            .then(res => {
                if (res.user.email) {
                    Swal.fire({
                        title: "Your account has been created!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    navigate('/dashboard');
              };
            })
            .catch(err => {
                console.log(err);
        })
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative w-full h-64 md:h-auto md:min-h-screen">
                <img
                    src={petImage}
                    alt="Register Pet Adoption"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Register Form Section */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                        Join the Paw Family 🐶
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${passwordError
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'focus:ring-orange-400'
                                    }`}
                                required
                            />
                        </div>

                        {passwordError && (
                            <p className="text-red-500 text-sm font-medium">{passwordError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!!passwordError}
                            className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            Register
                        </button>
                    </form>

                    <div className="my-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="border-t w-full"></div>
                        or
                        <div className="border-t w-full"></div>
                    </div>

                    <SocialLogin />

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-orange-500 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

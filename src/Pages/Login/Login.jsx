import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import petImage from '../../assets/pet-login.png'; 
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative w-full h-64 md:h-auto md:min-h-screen">
                <img
                    src={petImage}
                    alt="Adopt a Pet"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Login Form Section */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
                        Welcome Back 🐾
                    </h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="border-t w-full"></div>
                        or
                        <div className="border-t w-full"></div>
                    </div>

                    <SocialLogin></SocialLogin>
                    
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-orange-500 font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

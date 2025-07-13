import React from 'react';
import { FaHeart, FaHandsHelping, FaHome } from 'react-icons/fa';

const AboutSection = () => {
    return (
        <section className="bg-gradient-to-r from-orange-50 to-white py-16 px-6 md:px-20 max-w-7xl mx-auto rounded-2xl shadow-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* left Text Content */}
                <div>
                    <h2 className="text-4xl font-extrabold text-[#ff9416] mb-4 relative inline-block">
                        About Us
                        <span className="block h-1 w-20 bg-[#ff9416] rounded mt-1"></span>
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        At <span className="font-semibold text-[#ff9416]">PetConnect</span>, we unite loving humans and pets in need of forever homes. Our mission is to create a caring community where adoption, donations, and support thrive.
                    </p>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="flex flex-col items-center text-center">
                            <FaHeart className="text-[#ff9416] text-4xl mb-2" />
                            <h3 className="font-semibold text-lg">Adoption Made Easy</h3>
                            <p className="text-gray-600 text-sm mt-1">Find your perfect furry companion quickly and safely.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <FaHandsHelping className="text-[#ff9416] text-4xl mb-2" />
                            <h3 className="font-semibold text-lg">Community Support</h3>
                            <p className="text-gray-600 text-sm mt-1">Join others helping pets through donations and volunteering.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <FaHome className="text-[#ff9416] text-4xl mb-2" />
                            <h3 className="font-semibold text-lg">Transparency & Trust</h3>
                            <p className="text-gray-600 text-sm mt-1">We ensure honest and reliable processes for all users.</p>
                        </div>
                    </div>

                    <button className="bg-[#ff9416] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300">
                        Learn More
                    </button>
                </div>

                {/* right Image */}
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"
                        alt="Happy adopted pets"
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

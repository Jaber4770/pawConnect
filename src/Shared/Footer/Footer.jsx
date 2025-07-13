import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import PawLogo from '../Logo/PawLogo';

const Footer = () => {
    return (
        <footer className="bg-orange-50 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div>
                        <PawLogo></PawLogo>
                    <p className="mt-2 text-sm">
                        Bringing paws together 🐾 Adopt, love, and give every pet a forever home.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/adopt" className="hover:underline">Adopt a Pet</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-orange-500 hover:text-orange-700 text-xl"><FaFacebookF /></a>
                        <a href="#" className="text-orange-500 hover:text-orange-700 text-xl"><FaTwitter /></a>
                        <a href="#" className="text-orange-500 hover:text-orange-700 text-xl"><FaInstagram /></a>
                        <a href="#" className="text-orange-500 hover:text-orange-700 text-xl"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            <div className="text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} Paw Connect. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

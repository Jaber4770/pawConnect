import React from 'react';
import happyAdoptedDog from '../../../assets/images/happy-adopted-dog.jpg'
import happyAdoptedCat from '../../../assets/images/happy-adopted-cat.jpg'
import happyFamily from '../../../assets/images/happy-family-with-pet.jpg'

const Inspiration = () => {
    return (
        <section className="bg-gradient-to-r from-orange-100 to-orange-50 py-16 mb-12 px-6 md:px-16 rounded-2xl shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Left Side - Images */}
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <img
                        src={happyAdoptedDog}
                        alt="Happy adopted dog"
                        className="rounded-lg object-cover w-full h-48 md:h-60 shadow-lg hover:scale-105 transition duration-300"
                    />
                    <img
                        src={happyAdoptedCat}
                        alt="Happy adopted cat"
                        className="rounded-lg object-cover w-full h-48 md:h-60 shadow-lg hover:scale-105 transition duration-300"
                    />
                    <img
                        src={happyFamily}
                        alt="Happy family with pet"
                        className="rounded-lg object-cover w-full h-48 md:h-60 shadow-lg col-span-2 hover:scale-105 transition duration-300"
                    />
                </div>

                {/* Right Side - Text + CTA */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-[#ff9416] mb-6">
                        Give a Pet a Second Chance at Happiness
                    </h2>
                    <p className="text-gray-700 text-lg mb-8">
                        Every pet deserves a loving home. By adopting, you’re not just changing their life — you’re changing yours forever. Join us in making a difference today!
                    </p>

                    <div className="flex gap-6">
                        <button
                            className="bg-[#ff9416] text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
                            onClick={() => alert('Redirect to Adopt Now')}
                        >
                            Adopt Now
                        </button>
                        <button
                            className="border border-[#ff9416] text-[#ff9416] px-6 py-3 rounded-lg hover:bg-[#ff9416] hover:text-white transition"
                            onClick={() => alert('Redirect to Donate')}
                        >
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inspiration;

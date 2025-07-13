import React from 'react';
import bella from '../../../assets/successStory/bella.jpg'
import max from '../../../assets/successStory/max.jpg'
import luna from '../../../assets/successStory/luja.jpg'

const stories = [
    {
        id: 1,
        name: 'Bella & The Smiths',
        image: bella, // Replace with your actual image paths
        story: 'Bella found her forever home and fills it with joy every day!',
    },
    {
        id: 2,
        name: 'Max’s New Family',
        image: max,
        story: 'Max was rescued and now enjoys long walks and endless cuddles.',
    },
    {
        id: 3,
        name: 'Luna’s Journey',
        image: luna,
        story: 'Luna overcame challenges and now lives happily with her new family.',
    },
];

const HappyTails = () => {
    return (
        <section className="py-16 bg-orange-50 rounded-2xl">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
                    Happy Tails: Success Stories
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {stories.map(({ id, name, image, story }) => (
                        <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-orange-600 mb-2">{name}</h3>
                                <p className="text-gray-700">{story}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
                        Share Your Story
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HappyTails;

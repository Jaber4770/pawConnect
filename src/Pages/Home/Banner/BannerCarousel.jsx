import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Controller, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Banner.css'
import adoptImg from '../../../assets/images/adopt.png';
import donationImg from '../../../assets/images/donation.png';
import lostFoundImg from '../../../assets/images/lost&found.jpg';
import volunteerImg from '../../../assets/images/volunteer.jpg';
import generalImg from '../../../assets/images/general.jpg';

const slides = [
    {
        image: adoptImg,
        title: 'Adopt a Pet',
        description: 'Submit adoption requests and give pets a new loving home.',
    },
    {
        image: donationImg,
        title: 'Donation Campaigns',
        description: 'Support rescue efforts and shelter needs through donations.',
    },
    {
        image: lostFoundImg,
        title: 'Lost & Found',
        description: 'Report or search for lost pets and help reunite families.',
    },
    {
        image: volunteerImg,
        title: 'Join as a Volunteer',
        description: 'Become part of our mission to care for furry friends.',
    },
    {
        image: generalImg,
        title: 'All-in-One Pet Platform',
        description: 'Manage adoptions, donations, and reports—all in one place.',
    },
];

const BannerCarousel = () => {
    const imageSwiperRef = useRef(null);
    const textSwiperRef = useRef(null);

    return (
        <div className="w-full h-[70vh] bg-white overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Slider */}
                <Swiper
                    modules={[Autoplay, Controller, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
                    controller={{ control: textSwiperRef.current }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full bg-orange-50"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transition duration-1000 ease-in-out"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Text Slider */}
                <Swiper
                    modules={[Autoplay, Controller]}
                    onSwiper={(swiper) => (textSwiperRef.current = swiper)}
                    controller={{ control: imageSwiperRef.current }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="w-full h-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className='bg-orange-50'>
                            <div className="flex items-center justify-center h-full  animate-slide-up px-6">
                                <div className="text-center space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-bold text-orange-500">
                                        {slide.title}
                                    </h2>
                                    <p className="text-gray-700 text-lg">{slide.description}</p>
                                    <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BannerCarousel;

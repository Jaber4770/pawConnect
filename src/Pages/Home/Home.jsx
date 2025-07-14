import React from 'react';
import BannerCarousel from './Banner/BannerCarousel';
import PetCategory from './PetCategory/PetCategory';
import Inspiration from './Inspiration/Inspiration';
import AboutSection from './AboutSection/AboutSection';
import HappyTails from './HappyTails/HappyTails';
import EventsCampaigns from './EventsCampaigns/EventsCampaigns';
import NewsletterSection from './NewsletterSection/NewsletterSection';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto mt-10'>
            <BannerCarousel></BannerCarousel>
            <PetCategory></PetCategory>
            <Inspiration></Inspiration>
            <AboutSection></AboutSection>
            <HappyTails></HappyTails>
            <EventsCampaigns></EventsCampaigns>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;
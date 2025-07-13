import React from 'react';
import Spinner from '../../Shared/Loader/Spinner';
import BannerCarousel from './Banner/BannerCarousel';
import PetCategory from './PetCategory/PetCategory';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto mt-10'>
            <BannerCarousel></BannerCarousel>
            <PetCategory></PetCategory>
        </div>
    );
};

export default Home;
import React from 'react';
import Spinner from '../../Shared/Loader/Spinner';
import BannerCarousel from './Banner/BannerCarousel';
import PetCategory from './PetCategory/PetCategory';
import Inspiration from './Inspiration/Inspiration';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto mt-10'>
            <BannerCarousel></BannerCarousel>
            <PetCategory></PetCategory>
            <Inspiration></Inspiration>
        </div>
    );
};

export default Home;
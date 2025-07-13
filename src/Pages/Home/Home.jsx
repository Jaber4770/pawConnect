import React from 'react';
import Spinner from '../../Shared/Loader/Spinner';
import BannerCarousel from './Banner/BannerCarousel';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto my-5'>
            <BannerCarousel></BannerCarousel>
        </div>
    );
};

export default Home;
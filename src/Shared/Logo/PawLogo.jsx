import React from 'react';
import Logo from '../../assets/Paw_Connect-logo.png'
import { Link } from 'react-router';

const PawLogo = () => {
    return (
        <div>
            <Link to={'/'}>
                <img className='w-16' src={Logo} alt="" />
            </Link>
        </div>
    );
};

export default PawLogo;
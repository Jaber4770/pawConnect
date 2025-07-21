import React from 'react';
import Logo from '../../assets/Paw_Connect-logo.png'
import { Link } from 'react-router';

const PawLogo = () => {
    return (
        <div>
            <img className='w-16' src={Logo} alt="" />
        </div>
    );
};

export default PawLogo;
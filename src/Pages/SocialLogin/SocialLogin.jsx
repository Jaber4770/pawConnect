import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const { signInWithGooglePopUp } = useAuth();
    const navigate = useNavigate();


    const handleGooglePopupLogin = () => {
        signInWithGooglePopUp()
            .then(result => {
                if (result.user.email) {
                    // user will be redirect to dashboard.
                    navigate("/dashboard");
              }
            }).catch(error => {
                console.log(error);
        })
    }

    return (
        <div>
            <div className="space-y-3">
                <button onClick={handleGooglePopupLogin} className="w-full flex items-center justify-center cursor-pointer gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100">
                    <FcGoogle
                        className='text-3xl' />
                    Login with Google
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <FaFacebook className="text-blue-600 text-3xl" />
                    Login with Facebook
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.init';


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {


    const createUser = () => {
        
    }

    const signInUser = () => {
        
    }

    const signInWithGooglePopUp = () => {
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        
    }

    const updateUserProfile = () => {
        
    }

/*     useEffect(() => {
        const unsubscribe = onAuthStateChanged();
        return () => unsubscribe();
    },[]) */



    const authInfo = {
        logOutUser,
        signInUser,
        createUser,
        signInWithGooglePopUp,
        updateUserProfile
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
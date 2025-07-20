import React, { useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.init';
import { Password } from '@mui/icons-material';


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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
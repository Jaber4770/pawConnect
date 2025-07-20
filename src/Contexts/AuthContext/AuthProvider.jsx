import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.init';
import { Password } from '@mui/icons-material';


const provider = new GoogleAuthProvider();
const FbProvider = new FacebookAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGooglePopUp = () => {
        return signInWithPopup(auth, provider);
    }

    const signInWithFacebookPopUp = () => {
        return signInWithPopup(auth, FbProvider);
    }

    const logOutUser = () => {

    }

    const updateUserProfile = () => {

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [])



    const authInfo = {
        user,
        setUser,
        loading,
        logOutUser,
        signInUser,
        createUser,
        updateUserProfile,
        signInWithGooglePopUp,
        signInWithFacebookPopUp,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
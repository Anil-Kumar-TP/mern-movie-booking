"use client"; 

import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase.js'; 
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useRouter } from 'next/navigation'; 

export default function OAuth () {
    const dispatch = useDispatch();
    const router = useRouter(); 

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('http://localhost:5001/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            router.push('/'); 

        } catch (error) {
            console.log('Cannot sign in with Google', error);
        }
    };

    return (
        <button
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
            onClick={handleGoogleClick}
        >
            Continue with Google
        </button>
    );
}

import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase,config';

export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const singIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
   
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser,userInfo)
    }

    const providers = new GoogleAuthProvider()

        const google = () =>{
            return signInWithPopup(auth,providers)
        }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authIfo = {
        createUser ,
        singIn,
        updateUser,
        google ,
        logOut ,
        loading,
        user,
      
        
    }

  
   useEffect(()=> {
    const unsubscribe= onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false)
    })
    return()=> unsubscribe()
      
   },[])
    

    return (
        <div>
            <AuthContext.Provider value={authIfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
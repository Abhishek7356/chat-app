import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase';

export const AuthContext = createContext();
function Auth({ children }) {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const authaction = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            // console.log(user);
        })

        return () => {
            authaction()
        }
    }, [])

    return (
        <div>
            <AuthContext.Provider value={currentUser}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default Auth
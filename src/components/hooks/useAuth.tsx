import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserAuth } from "../../assets/types";

import {firebase, auth, database} from '../../services/firebase'

type AuthProviderProps = {
    children: ReactNode
}

interface AuthContextData {
    googleSignIn: () =>  Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        console.log(user)
    }, [user])

    async function googleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if(result.user){
            const {displayName, photoURL, uid} = result.user;
            
            const dataFromFirebase = await database.ref(`users/${uid}`).once('value', (data) => data.val())

            if(dataFromFirebase.val()){
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    life:  dataFromFirebase.val().life,
                    points:  dataFromFirebase.val().points
                });
            }else{
                const userData: User = {
                    id: uid, 
                    name: displayName,
                    avatar: photoURL,
                    points: 0, 
                    life: 5
                }
                await database.ref(`users/${uid}`).set(userData);
                setUser(userData);
            }        
        }
    }

    return (
        <AuthContext.Provider value={{
            googleSignIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
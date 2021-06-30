import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {firebase, auth, database} from '../../services/firebase'

import { User } from "../../assets/types";

type AuthProviderProps = {
    children: ReactNode
}

interface AuthContextData {
    user: User | undefined;
    googleSignIn: () =>  Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                const {displayName, photoURL, uid} = user;                
                if(!displayName || !photoURL){
                    throw new Error("Missing information from Google Account")
                }                
                getUser(uid, photoURL, displayName);
            }
        });
        return () => {
            unsubscribe();
        }
    }, [user])

    async function googleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if(result.user){
            const {displayName, photoURL, uid} = result.user;
            
            if(!displayName || !photoURL){
                throw new Error("Missing information from Google Account")
            }

            getUser(uid, photoURL, displayName);        
        }
    }

    // async function googleSignOut(){
    //     setUser(undefined)
    //     await firebase.auth().signOut();        
    //     history.push('/')
    // }

    async function getUser(uid: string, photoURL: string, displayName: string){

        const splitedName = displayName.split(" ");
        let name = "";
        if(splitedName[1].length < 3) {
            name = (splitedName[0].concat(" ", splitedName[1], " ", splitedName[2]))
        }else{
            name = (splitedName[0].concat(" ", splitedName[1]))
        }

        const dataFromFirebase = await database.ref(`users/${uid}`).once('value', (data) => data.val());

        if(dataFromFirebase.val()){
            setUser({
                id: uid,
                name,
                avatar: photoURL,
                life:  dataFromFirebase.val().life,
                points:  dataFromFirebase.val().points
            });
        }else{
            const userData: User = {
                id: uid, 
                name,
                avatar: photoURL,
                points: 0, 
                life: 5
            }
            await database.ref(`users/${uid}`).set(userData);
            setUser(userData);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            googleSignIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
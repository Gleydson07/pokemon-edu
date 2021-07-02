import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {firebase, auth, database} from '../../services/firebase';

import { User } from "../../assets/types";
import { useHistory, useLocation } from "react-router-dom";
import { MAX_LIFE } from "../../assets/consts";
import { useQuestion } from "./useQuestion";

type AuthProviderProps = {
    children: ReactNode
}

interface AuthContextData {
    user: User | undefined;
    updateGamePointsOfUser: (points: number, isCorrect:boolean) =>  void;
    resetUserPointsAndLife: () => void;
    googleSignIn: () =>  Promise<void>;
    googleSignOut: () =>  Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User>();
    const location = useLocation();
    const history = useHistory();

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
    }, [])

    useEffect(() => {
        
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
            
            history.push("/dashboard")
        }
    }

    async function googleSignOut(){
        setUser(undefined);
        await firebase.auth().signOut();
        history.push('/');
    }

    async function getUser(uid: string, photoURL: string, displayName: string){

        const splitedName = displayName.split(" ");
        let name = "";
        if(splitedName[0].length > 6){
            name = splitedName[0];
        }else if(splitedName[0].length <= 6 && splitedName[1].length < 3) {
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
                life: MAX_LIFE
            }
            await database.ref(`users/${uid}`).set(userData);
            setUser(userData);
        }
    }
    
    async function resetUserPointsAndLife(){
        if(user){
            await database.ref(`answers/${user?.id}`).remove();
            await database.ref(`users/${user?.id}`).update({
                points: 0,
                life: MAX_LIFE
            });

            setUser({
                ...user, 
                points: 0,
                life: MAX_LIFE,
            })
        }
    }

    async function updateGamePointsOfUser(points: number, isCorrect:boolean){
        if(user){
            if(isCorrect){
                setUser({...user, points: user.points+points})

                await database.ref(`users/${user?.id}`).update({
                    points: user.points+points
                });
            }else{
                if(user.life > 0){
                    setUser({...user, life: user.life-1})

                    await database.ref(`users/${user?.id}`).update({
                        life: user.life-1
                    });
                }
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            updateGamePointsOfUser,
            resetUserPointsAndLife,
            googleSignIn,
            googleSignOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
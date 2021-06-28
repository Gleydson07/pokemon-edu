// import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth } from './components/hooks/useAuth';

import logoImg from './assets/logo.png'
import styles from './styles/home.module.scss';
import { useEffect } from 'react';

export function Home(){
    const { googleSignIn, user } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if(user){
            history.push('/dashboard')
        }
    },[user])

    async function handleLogin(){
        googleSignIn();
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src={logoImg} alt="pokemon education" />
                <button 
                    onClick={handleLogin}
                    className={styles.signIn}
                >
                    Entrar com Google
                </button>
            </div>
            <section>
                <p>Gleydson Albuquerque</p>
                <p>gassantos.dev@gmail.com</p>
                <p>(82) 98111-4246</p>
            </section>
        </div>
    )
}
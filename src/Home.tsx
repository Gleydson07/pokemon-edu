import { useAuth } from './components/hooks/useAuth';

import logoImg from './assets/logo.png'
import styles from './styles/home.module.scss';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export function Home(){
    const history = useHistory();
    const { googleSignIn, user } = useAuth();

    useEffect(() => { 
        user && history.push("/dashboard");        
    },[user, history])

    async function handleLogin(){
        googleSignIn();
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src={logoImg} alt="pokemon education" />
                <button 
                    onClick={handleLogin}
                    className={`styles.signIn tinRightIn`}
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
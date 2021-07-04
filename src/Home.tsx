import { useAuth } from './components/hooks/useAuth';

import logoImg from './assets/logo.png'
import styles from './styles/home.module.scss';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SiLinkedin } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';
import { SiGmail } from 'react-icons/si';
import { SiWhatsapp } from 'react-icons/si';



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
                <span>Entre em contato</span>
                {/* <p>Gleydson Albuquerque</p> */}
                <div className={styles.socialMedia}>
                    <a target="_blank" href="https://www.linkedin.com/in/gleydson07/" rel="noopener noreferrer">
                        < SiLinkedin/>
                    </a>
                    <a target="_blank" href="https://github.com/Gleydson07" rel="noopener noreferrer">
                        < SiGithub/>
                    </a>
                    <a target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=gassantos.dev@gmail.com&body=%E2%80%8BDescreva%20aqui%20o%20assunto%20de%20sua%20mensagem.%E2%80%8B&tf=cm" rel="noopener noreferrer">
                        < SiGmail/>
                    </a>
                    <a target="_blank" href="https://api.whatsapp.com/send?phone=558281114246&text=Ol%C3%A1!!%20%F0%9F%98%80" rel="noopener noreferrer">
                        < SiWhatsapp/>
                    </a>
                </div>
                <span>@gassantos.dev</span>
            </section>
        </div>
    )
}
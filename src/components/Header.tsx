import { Heart } from './Heart';
import { useAuth } from '../components/hooks/useAuth';

import { IoReloadOutline } from 'react-icons/io5'
import { ImExit } from 'react-icons/im'
import logoImg from '../assets/logo.png'
import styles from '../styles/header.module.scss';

export function Header(){
    const {user, googleSignOut} = useAuth();

    return (
        <header className={styles.container}>
            <img src={logoImg} alt="pokemon" />
            {user && (
                <div>
                    <div className={styles.statistics}>
                        <div className={styles.header}>
                                <img src={user?.avatar} alt={user?.name} /> 
                                <h1>{user?.name}</h1>
                            <button onClick={() => googleSignOut()} data-tip="Sair da conta">
                                <ImExit/>
                            </button>
                        </div>
                        <div className={styles.footer}>
                            <span>Pts: <strong>{user?.points}</strong></span>
                            <Heart/>
                            <button>
                                <IoReloadOutline/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
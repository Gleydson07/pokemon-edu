import { Heart } from './Heart';
import { useAuth } from '../components/hooks/useAuth';

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
                    <div className={styles.data}>
                        <div className={styles.statistics}>
                            <h1>{user?.name}</h1>
                            <div>
                                <span>Pos: <strong>2</strong> de 30</span>
                                <span>Pts: <strong>{user?.points}</strong></span>
                            </div>
                        </div>
                        <div className={styles?.life}>
                            <Heart/>
                        </div>
                    </div>
                    <button onClick={() => googleSignOut()}>
                        <ImExit/>
                    </button>
                </div>
            )}
        </header>
    )
}
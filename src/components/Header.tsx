import { Heart } from './Heart';
import { useAuth } from '../components/hooks/useAuth';

import { GameReloadModal } from './modals/GameReloadModal';
import { RankingUsersModal } from './modals/RankingUsersModal';
import { ExitToGameModal } from './modals/ExitToGameModal';

import { IoReloadOutline } from 'react-icons/io5'
import { ImExit } from 'react-icons/im'
import { GiPodium } from 'react-icons/gi'
import { useEffect, useState } from 'react';

import styles from '../styles/header.module.scss';
import logoImg from '../assets/logo.png'

export function Header(){
    const {user, rankingOfUsers, podium} = useAuth();
    const [ openModalGameReset, setOpenModalGameReset ] = useState(false);
    const [ openModalRankingUsers, setOpenModalRankingUsers ] = useState(false);
    const [ openModalExitToGame, setOpenModalExitToGame ] = useState(false);

    useEffect(() => {
        setOpenModalRankingUsers(false);
        setOpenModalGameReset(false);
    }, [user]);

    function openRankingModal(){
        setOpenModalRankingUsers(true);
    }

    function openExitToGameModal(){
        setOpenModalExitToGame(true);
    }

    function resetGame(){
        setOpenModalGameReset(true);
    }

    return (
        <>
            <header className={styles.container}>
                <img src={logoImg} alt="pokemon" />
                {user && (
                    <div>
                        <div className={styles.statistics}>
                            <div className={styles.header}>
                                <div>
                                    <img src={user?.avatar} alt={user?.name} /> 
                                    <h1>{user?.name}</h1>
                                </div>
                                <button onClick={() => openExitToGameModal()} data-tip="Sair da conta">
                                    <ImExit/>
                                </button>
                            </div>
                            <div className={styles.footer}>
                                <span>Pontos: <strong>{user?.points}</strong></span>                                
                                <span>Record: <strong>{user?.maxPoints}</strong></span>
                                <button onClick={() => resetGame()}>
                                    <IoReloadOutline/>
                                </button>
                            </div>
                            <div className={styles.footer}>
                                <Heart/>
                                <span>
                                    Ranking: 
                                    <strong> {podium} </strong> 
                                    de 
                                    <strong> {rankingOfUsers?.length} </strong>
                                </span>                                
                                <button onClick={() => openRankingModal()}>
                                    <GiPodium color="white"/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <GameReloadModal 
                isVisible={openModalGameReset}
                userAction={openModalGameReset}
            />

            <RankingUsersModal 
                isVisible={openModalRankingUsers}
            />

            <ExitToGameModal isVisible={openModalExitToGame}/>
        </>
    )
}
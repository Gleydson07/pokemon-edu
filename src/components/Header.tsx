import React, { useEffect, useState } from 'react';

import { Heart } from './Heart';
import { useAuth } from '../components/hooks/useAuth';
import styles from '../styles/header.module.scss';

import logoImg from '../assets/logo.png'

export function Header(){
    const {user} = useAuth();

    return (
        <header className={styles.container}>
            <img src={logoImg} alt="pokemon" />
            <div className={styles.data}>
                <div className={styles.statistics}>
                    <h1>{user?.name}</h1>
                    <div>
                        <span>Pos: <strong>2</strong> de 30</span>
                        <span>Pts: <strong>{user?.points}</strong></span>
                    </div>
                </div>
                <div className={styles?.life}>
                    {/* <Heart/> */}
                </div>
            </div>
        </header>
    )
}
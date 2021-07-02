import { Suspense, useEffect } from "react";

import { Card } from "./components/Card";
import { Header } from "./components/Header";

import { usePokemon } from "./components/hooks/usePokemon";
import { Pokemon } from "./assets/types";

import styles from './styles/dashboard.module.scss'
import { useAuth } from "./components/hooks/useAuth";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
    const { user } = useAuth();
    const { pokemons } = usePokemon();
    const history = useHistory();

    useEffect(() => {
        !user && history.push('/');
    },[user])

    return (
        <div>
            <Header/>
            <div className={styles.container} >
                <div className={styles.contentPokeballList} >

                    <Suspense fallback={<div>Loading...</div>}>                    
                        {pokemons && pokemons?.map((item:Pokemon) => (
                            <Card pokemon={item} key={item.id}/>
                        ))}
                    </Suspense>

                </div>  
            </div>
        </div>
    )
}

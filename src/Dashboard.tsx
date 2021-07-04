import { Suspense, useEffect } from "react";

import { useAuth } from "./components/hooks/useAuth";

import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { usePokemon } from "./components/hooks/usePokemon";

import { Pokemon } from "./assets/types";
import styles from './styles/dashboard.module.scss'
import { useHistory } from "react-router-dom";
import { WinnerGameModal } from "./components/modals/WinnerGameModal";
import { useQuestion } from "./components/hooks/useQuestion";


export default function Dashboard() {
    const history = useHistory();
    const { user } = useAuth();
    const { pokemons } = usePokemon();
    const { isFinishedGame } = useQuestion();

    useEffect(() => {
        !user && history.push("/");
    },[user, history])

    return (
        <>
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

            <WinnerGameModal isVisible={isFinishedGame}/>
        </>
    )
}

import { Suspense } from "react";

import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { QuestionModal } from "./components/Modals/QuestionModal";

import { usePokemon } from "./components/hooks/usePokemon";
import { Pokemon } from "./assets/types";

import styles from './styles/dashboard.module.scss'

export default function Dashboard() {
  const { pokemons } = usePokemon();
  return (
    <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.contentPokeballList} >

                <Suspense fallback={<div>Loading...</div>}>                    
                    {pokemons && pokemons?.map((item:Pokemon) => (
                        <Card pokemon={item} key={item.id}/>
                    ))}
                </Suspense>

            </div>  
        </div>

        <QuestionModal isVisible={false}>

        </QuestionModal>
    </>
  )
}

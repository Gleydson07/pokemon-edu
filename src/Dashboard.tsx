import { useEffect, useState, Suspense } from "react";
import axios from "axios";

import { Card } from "./components/Card";
import { Header } from "./components/Header";

import { usePokemon } from "./components/hooks/usePokemon";
import { Pokemon } from "./assets/types";

import styles from './styles/card.module.scss'

export default function Dashboard() {
  const { pokemons } = usePokemon();

  return (
    <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.contentPokeballList}>

                <Suspense fallback={<div>Loading...</div>}>
                    {pokemons?.map((item:Pokemon) => (
                        <Card dataPokemon={item} key={item.id}/>
                    ))}
                </Suspense>

            </div>  
        </div>
    </>
  )
}

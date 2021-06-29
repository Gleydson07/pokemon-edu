import { Suspense } from "react";

import { Card } from "./components/Card";
import { Header } from "./components/Header";

import { usePokemon } from "./components/hooks/usePokemon";
import { Pokemon } from "./assets/types";

import styles from './styles/dashboard.module.scss'
import { CustomModal } from "./components/CustomModal";

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

        <CustomModal visible={true}>
            {<div className={styles.form}>
                <form action="">
                    <input type="text" placeholder="name" />
                    <input type="text" placeholder="password" />
                    <input type="text" placeholder="image" />
                </form>
            </div>}
        </CustomModal>
    </>
  )
}

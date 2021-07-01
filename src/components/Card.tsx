import { useState } from 'react';

import { useAuth } from './hooks/useAuth';
import { useQuestion } from './hooks/useQuestion';

import { QuestionModal } from '../components/Modals/QuestionModal';
// import { FcCancel } from 'react-icons/fc'

import { Pokemon } from '../assets/types';
import { RiHeart3Fill, RiSwordFill, RiShieldFill } from 'react-icons/ri'
import { CgPokemon } from 'react-icons/cg'
import pokeballImg from '../assets/pokeball.png';
import bgPokeballImg from '../assets/bgpokeball.png';

import styles from '../styles/card.module.scss'
import { setTimeout } from 'timers';

type PokemonData = {
    pokemon: Pokemon;
}

export function Card({pokemon}:PokemonData){
    const { user } = useAuth();
    const { id, name, image, type, hp, attack, defense } = pokemon;
    const { getQuestionById, question } = useQuestion();
    const [ openModalQuestion, setOpenModalQuestion ] = useState(false);
    
    function handleOpenModalQuestion(){
        getQuestionById(id-1);
        setTimeout(() => setOpenModalQuestion(true), 300);
    }
    
    return (
        <>
            {user && (
                <section className={`${styles.container} 
                    ${styles.middle} 
                    ${styles.showBack}
                `}
            >  
                <div 
                    className={`
                        ${styles.back}
                    `}
                >
                    <div className={`${styles.backContentDefault} 
                        // conditional to class call styles.hidden
                    `}>
                        <img src={bgPokeballImg} alt="background" />
                        <div className={styles.backContent}>
                            {/* conditional if the user makes a mistake  {winnerChallenge && <FcCancel/>} */}
                            <img src={image} alt={name} />
                            <h1>{name}</h1>
                        </div>
                    </div>

                    <div className={`${styles.backContentDetails} `}>
                        <img src={image} alt={name} />
                        <h1>{name}</h1>
                        <div>
                            <div className={styles.stats}>
                                <div>
                                    <RiHeart3Fill/>
                                    <strong>{hp}</strong>
                                </div>
                                <div>
                                    <RiSwordFill/>
                                    <strong>{attack}</strong>
                                </div>
                                <div>
                                    <RiShieldFill/>
                                    <strong>{defense}</strong>
                                </div>
                            </div>

                            <div className={styles.stats}>
                                <div>
                                    <CgPokemon/>
                                    <strong>{type}</strong>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                
                <div className={styles.front}
                    onClick={handleOpenModalQuestion}
                > 
                    <img src={pokeballImg} alt="pokeball" />
                </div>

            </section>
            )}
            <QuestionModal isVisible={openModalQuestion} question={question}/>
        </>
    )
}
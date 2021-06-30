import { useState } from 'react';

import { QuestionModal } from '../components/Modals/QuestionModal';

import { RiHeart3Fill, RiSwordFill, RiShieldFill } from 'react-icons/ri'
// import { FcCancel } from 'react-icons/fc'
import { CgPokemon } from 'react-icons/cg'

import pokeballImg from '../assets/pokeball.png';
import bgPokeballImg from '../assets/bgpokeball.png';

import { Pokemon } from '../assets/types';
import styles from '../styles/card.module.scss'

type PokemonData = {
    pokemon: Pokemon;
}

export function Card({pokemon}:PokemonData){
    const { name, image, type, hp, attack, defense, question } = pokemon;
    const [ openModalQuestion, setOpenModalQuestion ] = useState(false);
    
    function handleOpenModalQuestion(){
        setOpenModalQuestion(true);
    }

    return (
        <>
            <section className={`${styles.container} 
                ${styles.middle} 
                // conditional to class call styles.showBack
                `}
            >  
                <div 
                    className={`
                        ${styles.back}
                    `}  
                    // onMouseEnter={} show info into pokeball
                    // onMouseLeave={} hidden info on pokeball
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

            <QuestionModal isVisible={openModalQuestion} question={question}/>
        </>
    )
}
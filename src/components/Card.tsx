import { useEffect, useState } from 'react';

import { useAuth } from './hooks/useAuth';
import { useQuestion } from './hooks/useQuestion';

import { QuestionModal } from '../components/Modals/QuestionModal';

import { Pokemon, QuestionsCheckedListProps } from '../assets/types';
import { RiHeart3Fill, RiSwordFill, RiShieldFill } from 'react-icons/ri'
import { FcCancel } from 'react-icons/fc'
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
    const [ openModalQuestion, setOpenModalQuestion ] = useState(false);
    const { getQuestionById, question, answerCheckedList } = useQuestion();
    const [ answered, setAnswered ] = useState<QuestionsCheckedListProps>();

    useEffect(() => {
        const exists = answerCheckedList.find(answer => answer.idPokemon === id)
        setAnswered(exists);
    }, [answerCheckedList])
    
    function handleOpenModalQuestion(){
        getQuestionById(id-1);
        setTimeout(() => setOpenModalQuestion(true), 300);
    }
    
    return (
        <>
            {user && (
                <section className={`${styles.container} 
                    ${styles.middle} 
                    ${answered ? styles.showBack : ''}
                `}
            >  
                <div 
                    className={`
                        ${styles.back}
                    `}
                >
                    <div className={`${styles.backContentDefault} 
                        ${styles.hidden}
                    `}>
                        <img src={bgPokeballImg} alt="background" />
                        <div className={styles.backContent}>
                            {!answered?.isCorrect && <FcCancel/>}
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
import { useEffect, useState } from 'react';

import { useAuth } from './hooks/useAuth';
import { useQuestion } from './hooks/useQuestion';

import { QuestionModal } from '../components/modals/QuestionModal';
import { GameReloadModal } from '../components/modals/GameReloadModal';

import { Pokemon, QuestionsCheckedListProps } from '../assets/types';
import { RiHeart3Fill, RiSwordFill, RiShieldFill } from 'react-icons/ri'
import { FcCancel } from 'react-icons/fc'
import pokeballImg from '../assets/pokeball.png';
import bgPokeballImg from '../assets/bgpokeball.png';

import styles from '../styles/card.module.scss'
import { setTimeout } from 'timers';

type PokemonData = {
    pokemon: Pokemon;
}

export function Card({pokemon}:PokemonData){
    const { id, name, image, hp, attack, defense } = pokemon;
    const { user } = useAuth();
    const { getQuestionById, question, answerCheckedList } = useQuestion();
    const [ openModalQuestion, setOpenModalQuestion ] = useState(false);
    const [modalIsOpenGameReload, setModalIsOpenGameReload] = useState(false);
    const [ answered, setAnswered ] = useState<QuestionsCheckedListProps>();

    useEffect(() => {
        const exists = answerCheckedList.find(answer => answer.idPokemon === id)
        setAnswered(exists);
    }, [answerCheckedList])

    useEffect(() => {
        setTimeout(() => user?.life === 0 && setModalIsOpenGameReload(true), 1500);
    }, [user])
    
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

                            {/* <div className={styles.stats}>
                                <div>
                                    <CgPokemon/>
                                    <strong>{type}</strong>
                                </div>
                            </div> */}
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

            <GameReloadModal 
                isVisible={modalIsOpenGameReload} 
            />
        </>
    )
}
import React, { FormEvent, useEffect, useState } from 'react';

// import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Option, Pokemon, Question } from '../assets/types';
import { usePokemon } from '../components/hooks/usePokemon';
import { Alert } from './Alert';

import styles from '../styles/modal.module.scss'

interface IModalProps {
    visible: boolean;
    pokemon: Pokemon;
    onClose: () => void;
}

export function Modal({visible = false, onClose, pokemon}: IModalProps){
    const {handleUserAnswer} = usePokemon();

    const [answer, setAnswer] = useState<string | null>();
    const [isVisibleAlert, setIsVisibleAlert] = useState(false);
    // const {id, points, fase, matter, matterShow, activities} = pokemon.question;
 
    function handleOpenAlert(){
        setIsVisibleAlert(true);
    }

    function handleCloseAlert(){
        setIsVisibleAlert(false);
    }

    // function handleChange(e){
    //     setAnswer(e.target.value);
    // }
    
    function handleSubmit(event: FormEvent){
        event.preventDefault();
        // handleUserAnswer(answer, pokemon);
        
        answer ? (
            onClose()
        ) : (
            handleOpenAlert(),
            setAnswer(null)
        )        
    }

    return (
        <>
            <div className={styles?.container}>
                {/* <Rodal 
                    visible={visible} 
                    onClose={onClose} 
                    width={500}
                    height={450}
                    showCloseButton={false}
                    closeMaskOnClick={false}
                    enterAnimation="flip"
                >
                    <form className={styles?.content} onSubmit={handleSubmit}>
                        <img src={`./${matter}.png`} alt={matterShow} />
                        <div className={styles.data}>
                            <span>{points} pontos</span>
                            <h2>{activities?.enunciation}</h2>
                            <p>{activities?.question}</p>

                            <div 
                                className={styles.answer}
                                onChange={handleChange}
                            >
                                {activities?.options.map((response: Option) => (
                                    <span key={response.option}>
                                        <input type="radio" id={response.option} name="quest" value={response.option} />
                                        <label htmlFor={response.option}>{response.option}</label>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button type="submit" onClick={handleSubmit}>
                            <span>Responder</span>
                            <img src="./pikachu.gif" alt="Responder" />
                        </button>
                    </form>
                </Rodal>         */}
            </div>

            <Alert 
                visible={isVisibleAlert}
                onClose={handleCloseAlert}
                message="Você não selecionou uma resposta"
                warning="Clique em sair para voltar a questão."
            />
        </>
    )
}
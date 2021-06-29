// import { useState } from 'react';

// import { usePokemon } from '../components/hooks/usePokemon';
// import { useAuth } from '../components/hooks/useAuth';

// import {Modal} from '../Modal/index';
// import {ValidationResponse} from '../Modal/ValidationResponse/index'
// import {Alert} from '../Modal/Alert/index'

import { Pokemon } from '../assets/types';
// import styles from '../styles/card.module.scss'

// import { RiHeart3Fill, RiSwordFill, RiShieldFill } from 'react-icons/ri'
// import { FcCancel } from 'react-icons/fc'
// import { CgPokemon } from 'react-icons/cg'

type PokemonData = {
    dataPokemon: Pokemon
}

export function Card({dataPokemon}:PokemonData){
    // const {pokemonCard} = usePokemon();
    // const {user} = useAuth();

    // const [winnerChallenge, setWinnerChallenge] = useState(false);

    // const [showDefaultPokemon, setShowDefaultPokemon] = useState(false);
    // const [showInfoPokemon, setShowInfoPokemon] = useState(true);

    // const [isVisibleModal, setIsVisibleModal] = useState(false);
    // const [isVisibleResult, setIsVisibleResult] = useState(false);
    // const [isVisibleAlert, setIsVisibleAlert] = useState(false);

    // useEffect(() => {
    //     if(dataPokemon.id === pokemonCard?.id){
    //         handleOpenResult();
    //         setTimeout(() => (
    //             setWinnerChallenge((dataPokemon.id === pokemonCard?.id) && !pokemonCard.isCorrect),
    //             setShowDefaultPokemon(true),
    //             handleCloseResult()
    //         ),2500)
    //     }
    // }, [pokemonCard])

    // function handleShowModal(){
    //     !!user?.life ? (
    //         setIsVisibleModal(true)
    //     ) : (
    //         setIsVisibleAlert(true)
    //     );
    // }

    // function handleHideModal(){
    //     setIsVisibleModal(false)
    // }

    // function handleOpenResult(){
    //     setIsVisibleResult(true);
    // }

    // function handleCloseResult(){
    //     setIsVisibleResult(false);
    // }

    // function handleOpenAlert(){
    //     setIsVisibleAlert(true);
    // }

    // function handleCloseAlert(){
    //     setIsVisibleAlert(false);
    // }

    return (
        <>
            {/* <section className={`${styles.container} 
                ${styles.middle} 
                ${showDefaultPokemon && styles.showBack}
                `}
            >  
                <div 
                    className={`
                        ${styles.back}
                    `}  
                    onMouseEnter={() => setShowInfoPokemon(true)}
                    onMouseLeave={() => setShowInfoPokemon(false)} 
                >
                    <div className={`${styles.backContentDefault} 
                        ${showInfoPokemon && styles.hidden}
                    `}>
                        <img src="/bgpokeball.png" alt="background" />
                        <div className={styles.backContent}>
                            {winnerChallenge && <FcCancel/>}
                            <img src={dataPokemon.image} alt={dataPokemon.name} />
                            <h1>{dataPokemon.name}</h1>
                        </div>
                    </div>

                    <div className={`${styles.backContentDetails} `}>
                        <img src={dataPokemon.image} alt={dataPokemon.name} />
                        <h1>{dataPokemon.name}</h1>
                        <div>
                            <div className={styles.stats}>
                                <div>
                                    <RiHeart3Fill/>
                                    <strong>{dataPokemon.hp}</strong>
                                </div>
                                <div>
                                    <RiSwordFill/>
                                    <strong>{dataPokemon.attack}</strong>
                                </div>
                                <div>
                                    <RiShieldFill/>
                                    <strong>{dataPokemon.defense}</strong>
                                </div>
                            </div>

                            <div className={styles.stats}>
                                <div>
                                    <CgPokemon/>
                                    <strong>{dataPokemon.type}</strong>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                
                <div className={styles.front}
                    onClick={handleShowModal}  
                >
                    <img src="/pokeball.png" alt="pokeball" />
                </div>

            </section> */}

            {/* <Modal 
                visible={isVisibleModal} 
                onClose={handleHideModal} 
                pokemon={dataPokemon}
            />

            <ValidationResponse 
                visible={isVisibleResult}
                onCloseResult={handleCloseResult}
                points={dataPokemon?.question?.points}
                status={showPokemonCard?.answerIsCorrect}
            />

            <Alert 
                visible={isVisibleAlert}
                onClose={handleCloseAlert}
                message="Você não possui vidas para continuar!"
                warning="Aguarde 30 minutos para ganhar uma vida extra"
            /> */}
        </>
        
    )
}
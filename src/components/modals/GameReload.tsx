import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from '../../styles/modalGameReload.module.scss';

import { IoReloadOutline } from 'react-icons/io5'

interface IShowResultModalProps{
    isVisible: boolean;
    userAction?: boolean;
}

const customStyles = {
    zIndex: 1,
    overlay:{
        background: "#00000011",
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',

        width: "500px",
        height: "300px",
        padding: 0,
    },
};

Modal.setAppElement('#root');

export function GameReload({
    isVisible = false,
    userAction = false
}: IShowResultModalProps){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(isVisible);
    }, [isVisible])

    function closeModal(){
        setModalIsOpen(false);
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            style={customStyles}
        >
            <div className={styles.container}>
                {userAction ? (
                    <>
                        <p>Tem certeza que deseja reiniciar o jogo?</p>
                    </>
                ):(
                    <>
                        <p>GAME OVER</p>
                        <span>
                            Não fique triste!! <br/>
                            reinicie o jogo clicando no botão abaixo.
                        </span>
                    </>
                )}
                <button >                    
                    <IoReloadOutline/>
                </button>
            </div>
        </Modal>
    )
}
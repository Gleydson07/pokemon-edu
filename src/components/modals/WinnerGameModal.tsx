import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { IoReloadOutline } from 'react-icons/io5'
import { ImExit } from 'react-icons/im'

import { useAuth } from '../hooks/useAuth';
import styles from '../../styles/modalGameWinner.module.scss';

interface WinGameModalProps{
    isVisible: boolean;
}

const customStyles = {
    zIndex: 1,
    overlay:{
        background: "#00000033",
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: "600px",
        height: "400px",
        padding: 0,
    },
};

Modal.setAppElement('#root');

export function WinnerGameModal({
    isVisible = true
}: WinGameModalProps){
    const { resetUserPointsAndLife, googleSignOut } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(isVisible);
    }, [isVisible])

    function closeModal(){
        googleSignOut();
        setModalIsOpen(false);
    }

    function reloadGame(){
        resetUserPointsAndLife();
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
                <div className={styles.winnerGame}>
                    <p>Parabéns, você venceu o jogo!!</p>
                    <button onClick={() => reloadGame()}>                    
                        <IoReloadOutline/>
                    </button>
                    <button onClick={() => closeModal()}>
                        <ImExit/>
                    </button>
                </div>
            </div>
        </Modal>
    )
}
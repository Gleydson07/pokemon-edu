import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { useAuth } from '../hooks/useAuth';

import { QuestionsCheckedListProps } from '../../assets/types';
import winImg from '../../assets/win.png';
import lossImg from '../../assets/loss.png';
import styles from '../../styles/modalResult.module.scss';

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
        height: "500px",
        padding: 0,
    },
};

Modal.setAppElement('#root');

export function WinnerGameModal({
    isVisible = false
}: WinGameModalProps){
    const { resetUserPointsAndLife, googleSignOut } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(isVisible);
    }, [isVisible])

    function closeModal(){
        resetUserPointsAndLife();
        setModalIsOpen(false);
        googleSignOut();
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
                <button onClick={() => closeModal()}>
                    Sair
                </button>
            </div>
        </Modal>
    )
}
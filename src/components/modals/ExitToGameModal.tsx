import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Modal from 'react-modal';

import { ImExit } from 'react-icons/im'
import { IoReturnUpBackSharp } from 'react-icons/io5'

import styles from '../../styles/modalGameReload.module.scss';

interface IExitToGameModalProps{
    isVisible: boolean;
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

export function ExitToGameModal({
    isVisible = false
}: IExitToGameModalProps){
    const { user, googleSignOut } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(isVisible);

    useEffect(() => {
        setModalIsOpen(isVisible);
    }, [isVisible])

    useEffect(() => {setModalIsOpen(false)}, [user])

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
                <p>Deseja realmente sair?</p>
                <div className={styles.exitModal}>
                    <button onClick={() => closeModal()}>                    
                        <IoReturnUpBackSharp/>
                    </button>

                    <button onClick={() => googleSignOut()}>                    
                        <ImExit/>
                    </button>
                </div>
            </div>
        </Modal>
    )
}
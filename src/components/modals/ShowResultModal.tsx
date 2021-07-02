import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { useAuth } from '../hooks/useAuth';

import { QuestionsCheckedListProps } from '../../assets/types';
import winImg from '../../assets/win.png';
import lossImg from '../../assets/loss.png';
import styles from '../../styles/modalResult.module.scss';

interface IShowResultModalProps{
    isVisible: boolean;
    questionChecked: QuestionsCheckedListProps | undefined;
    points: number;
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

export function ShowResultModal({
    isVisible = false, 
    questionChecked,
    points
}: IShowResultModalProps){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        questionChecked && setModalIsOpen(isVisible);
        setTimeout(() => closeModal(), 1250);
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
                {questionChecked?.isCorrect ? (
                    <div className={styles.win}>
                        <div>
                            <p>Parabéns! 😍</p>
                            <p>Você ganhou </p>
                            <strong>{points}</strong>
                            <p> pontos.</p>
                        </div>
                        <img src={winImg} alt="Parabéns, você acertou!" />
                    </div>
                ):(
                    <div className={styles.loss}>
                        <div>
                            <p>Hum, que pena! </p>
                            <p>não foi dessa vez.</p>
                        </div>
                        <img src={lossImg} alt="Que pena, não foi dessa vez!" />
                    </div>                        
                )}
            </div>
        </Modal>
    )
}
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Question } from '../../assets/types';

import matematicImg from '../../assets/matematic.png';
import pikachuImg from '../../assets/pikachu.gif';
import portugueseImg from '../../assets/portuguese.png';
import styles from '../../styles/modal.module.scss'

interface IQuestionModalProps{
    isVisible: boolean;
    question: Question;
}

const customStyles = {
    overlay:{
        background: "#00000099",
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        minWidth: "550px",
        minHeight: "500px",
        padding: 0,
    },
};

Modal.setAppElement("#root");

export function QuestionModal({isVisible = false, question}: IQuestionModalProps){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {setModalIsOpen(isVisible)}, [isVisible])

    function closeModal(){
        setModalIsOpen(false);
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className={styles.container}>
            <form className={styles.content} >
                    <img src={question?.matter === "portuguese" ? 
                        portugueseImg : matematicImg
                        } alt={question?.matterShow}
                    />
                    <div className={styles.data}>
                        <span>{question?.points} pontos</span>
                        <h2>{question?.activities?.enunciation}</h2>
                        <p>{question?.activities?.question}</p>

                        <div 
                            className={styles.answer}
                            // onChange={handleChange}
                        >
                            {question?.activities?.options.map(response => (
                                <span key={response.option}>
                                    <input type="radio" id={response.option} name="quest" value={response.option} />
                                    <label htmlFor={response.option}>{response.option}</label>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit">
                        <span>Responder</span>
                        <img src={pikachuImg} alt="Responder" />
                    </button>
                </form>
                </div>
        </Modal>
    )
}
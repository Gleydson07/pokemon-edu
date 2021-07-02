import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ShowResultModal } from './ShowResultModal';

import matematicImg from '../../assets/matematic.png';
import portugueseImg from '../../assets/portuguese.png';
import pikachuImg from '../../assets/pikachu.gif';
import styles from '../../styles/modal.module.scss';
import { Question } from '../../assets/types';
import { useQuestion } from '../hooks/useQuestion';

interface IQuestionModalProps{
    isVisible: boolean;
    question: Question;
}

const customStyles = {
    zIndex: 1,
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

Modal.setAppElement('#root');

export function QuestionModal({isVisible = false, question}: IQuestionModalProps){
    const { checkAnswer, answerChecked } = useQuestion();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [answer, setAnswer] = useState<string>();

    const [isOpenShowResult, setIsOpenShowResult] = useState(false);

    useEffect(() => {
        question && setModalIsOpen(isVisible);
    }, [isVisible])

    function handleSubmitForm(e:FormEvent){
        e.preventDefault();
        answer && checkAnswer(question, answer);
        answer && closeModal();
        setIsOpenShowResult(true)
    }

    function closeModal(){
        setModalIsOpen(false);
    }

    return(
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                style={customStyles}
            >
                <div className={styles.container}>
                    <form className={styles.content} onSubmit={(e) => handleSubmitForm(e)}>
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
                            >
                                {question?.activities?.options.map(response => (
                                    <span key={response.option}>
                                        <input 
                                            type="radio" 
                                            id={response.option} 
                                            name="quest" 
                                            value={response.option} 
                                            onChange={(e) => setAnswer(e.target.value)}
                                        />
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

            <ShowResultModal 
                isVisible={isOpenShowResult} 
                questionChecked={answerChecked}
                points={question?.points}
            />
        </>
    )
}
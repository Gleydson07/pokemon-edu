import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import '../../styles/questionModal.module.scss'

interface IQuestionModalProps{
    isVisible: boolean;
    children: ReactNode;
}

ReactModal.setAppElement("#root");

export function QuestionModal({isVisible = true, children}: IQuestionModalProps){
    const [isOpen, setIsOpen] = useState(isVisible);
    useEffect(() => {console.log(isVisible)}, [isOpen])

    function closeModal(){
        setIsOpen(false);
    }

    return(
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
        >
            {children}
        </ReactModal>
    )
}
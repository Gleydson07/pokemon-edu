import { ReactNode, useState } from "react";

import { AiOutlineCloseCircle } from 'react-icons/ai'
import styles from '../styles/modalCustom.module.scss'

interface ICustomModal {
    children: ReactNode;
    visible: boolean;
}

export function CustomModal({children, visible = false}: ICustomModal){
    const [isVisible, setIsVisible] = useState(visible);

    function handleOpenModal(){
        setIsVisible(true)
    }

    function handleCloseModal(){
        setIsVisible(false)
    }
    return (
        <div className={`${styles.container} ${!isVisible ? styles.hidden : ''}`}>
            <div className={styles.content} >
                <button onClick={handleCloseModal}>
                    <AiOutlineCloseCircle />
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
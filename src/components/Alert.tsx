import React, { useEffect, useState } from 'react';

// import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

import styles from '../styles/alert.module.scss'

interface IAlertProps {
    visible: boolean;
    onClose: () => void;
    message: string;
    warning: string;
}

export function Alert({visible = false, onClose, message, warning}: IAlertProps){

    function handleCloseAlert(){
        onClose();
    }

    return (
        // <Rodal 
        //     visible={visible} 
        //     onClose={handleCloseAlert}
        //     showCloseButton={false}
        //     width={400}
        //     height={150}
        //     animation="flip"
        // >
        //     <div className={styles.alert}>
        //         <h1>{message}</h1>
        //         <p>{warning}</p>

        //         <button onClick={() => handleCloseAlert()}>Sair</button>
        //     </div>
        // </Rodal>
        <h1>rodal</h1>
    )
}
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { useAuth } from '../hooks/useAuth';
import styles from '../../styles/modalRankingUsers.module.scss';
import { User } from '../../assets/types';

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
        width: "500px",
        height: "700px",
        padding: 0,
    },
};

Modal.setAppElement('#root');

export function RankingUsersModal({
    isVisible = false
}: WinGameModalProps){
    const {user, rankingOfUsers} = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(isVisible);
    }, [isVisible])

    // useEffect(() => {
    //     if(rankingOfUsers){
    //         rankingOfUsers.find((data, index) => {
    //             if (data.id === user?.id){
    //                 setPodium(index+1);
    //             }
    //         })
    //     }
    // }, [user]);

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
                <table>
                    <caption>Ranking TOP 10</caption>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th>Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingOfUsers && rankingOfUsers.map((data, index) => (
                            <>                           
                                {index < 10 && (
                                    <tr key={data.id} 
                                        className={user?.id === data.id ? styles.myPoints : ''}
                                    >
                                        <td className={styles.numbers}>{index+1}</td>
                                        <td><img src={data.avatar} alt={data.name} /></td>
                                        <td>{data.name}</td>
                                        <td className={styles.numbers}>{data.maxPoints}</td>
                                    </tr>
                                )}                        
                            </>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => closeModal()}>
                    Sair
                </button>
            </div>
        </Modal>
    )
}
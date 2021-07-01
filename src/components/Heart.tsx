
import { ReactNode, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from '../styles/heart.module.scss'
import { useAuth } from './hooks/useAuth';

export function Heart() {
    const { user } = useAuth();
    const [heartList, setHeartList] = useState<ReactNode[]>();

    useEffect(() => {
        let count = 0;
        let heartArray = [];
        while(count < 5){
            user&& user?.life > count ? (
                heartArray.push(<AiFillHeart 
                    key={count} 
                    color="#d81719" 
                    fontSize="1.5rem"
                />)
            ) : (
                heartArray.push(<AiOutlineHeart 
                    key={count} 
                    color="#d81719" 
                    fontSize="1.5rem"
                />) 
            )            
            count++;
        }
        setHeartList(heartArray)
    }, [user])

    return (
        <div className={styles.container}>
            {heartList}
        </div>
    )
}
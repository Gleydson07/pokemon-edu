
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from '../styles/heart.module.scss'

export function Heart() {
    const [heartList, setHeartList] = useState([]);

    function list(){
        let count = 0;
        // let heartArray = [];
        // while(count < 5){
        //     user.life > count ? (
        //         heartArray.push(<AiFillHeart 
        //             key={count} 
        //             color="#d81719" 
        //             fontSize="1.5rem"
        //         />)
        //     ) : (
        //         heartArray.push(<AiOutlineHeart 
        //             key={count} 
        //             color="#d81719" 
        //             fontSize="1.5rem"
        //         />) 
        //     )
            
        //     count++;
        // }
        // setHeartList(heartArray)
    }

    return (
        <div className={styles.container}>
            {heartList}
        </div>
    )
}
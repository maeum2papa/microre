import { useEffect } from 'react';
import styles from '../styles/popup.module.scss';

export default function Popup({data,handleClose,key,handleCloseToday}) {

    

    useEffect(() => {
        // handleCloseToday('popup', 1)
    }, [])
    
    return (
        <>
            <div className={styles.popup}>
                <div dangerouslySetInnerHTML={{ __html: data.popupContent }}></div>
                <button onClick={()=>{handleClose(key);}}></button>
                <div className={styles.closeToday} onClick={handleCloseToday}>
                    오늘 하루 보지 않기
                </div>
            </div>
        </>
    )
}
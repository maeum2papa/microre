"use client"

import { useState } from 'react'
import styles from '../styles/modal.module.scss'

export default function RegisterModal({ setLoginFlag, setMemberOpen }) {

    
    const handleLogin = async () => {
        window.location.href = 'https://www.microscooters.co.kr/member/login.php?rcMode=member';
        // const geo = searchParams.get('geo')
        
    }

    return (
        <>
            <div className={styles.modal}>
                <button onClick={handleLogin}>회원으로 로그인</button>
                <button onClick={()=>setMemberOpen(true)}>비회원으로 로그인</button>
            </div>
            <div className={styles.mask} onClick={()=>setLoginFlag(false)}></div>
        </>
    )
}
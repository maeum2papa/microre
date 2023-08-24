"use client"

import { useState } from 'react'
import styles from '../styles/modal.module.scss'

export default function InquiryModal({ setInpiryOpen, setMemberOpen }) {

    const handleLogin = async () => {
        window.location.href = 'https://www.microscooters.co.kr/member/login.php?rcMode=member';
        // const geo = searchParams.get('geo')
    }

    return (
        <>
            <div className={`${styles.modal} ${styles.inquiry}`}>
                <button onClick={handleLogin}>로그인</button>
                <button onClick={()=>{setMemberOpen(true)}}>비회원 조회</button>
            </div>
            <div className={styles.mask} onClick={()=>setInpiryOpen(false)}></div>
        </>
    )
}
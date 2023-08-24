'use client';

import styles from '../styles/header.module.scss';
import { useRouter, useSearchParams } from 'next/navigation'
import { getCookie,setCookie } from '../services/cookie'
import React, { useEffect,useState } from 'react'

export default function Header() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const geotoken = getCookie('geotoken');
    const [loginFlag, setLoginFlag] = useState(false)
    let geo = searchParams.get('geo')

    
    
    

    if(geo) {
        const token = geo;
      
        if(token){
          setCookie('geotoken', token, {maxAge:(60*60)});
            

          useEffect(()=>{
            // router.replace('/');
            location.replace('/register');
          })
        }
      }


    const handleHome = (e)=>{
        e.preventDefault();
        location.href='/';
    };

    const handleLogout = (e)=>{
        e.preventDefault();
        location.href='https://www.microscooters.co.kr/api/logout';
    };


    useEffect(()=>{
        if(geotoken!=null){
            setLoginFlag(true);
        }
    });


    return (
        <header className={styles.header}>
            <div onClick={(e) => handleHome(e)} className={styles.wrap} style={{cursor:"pointer"}}>
                <b><img src="/logo.svg" alt="BigCo Inc. logo"/></b>
                <h1>마이크로 바이크 리콜 접수</h1>
            </div>

            { loginFlag &&  <a onClick={(e) => handleLogout(e)}>로그아웃</a>}
            
        </header>
    )
}
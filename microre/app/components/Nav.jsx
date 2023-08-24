'use client';

import { usePathname } from 'next/navigation'
import styles from '../styles/nav.module.scss'
import { getCookie } from '../services/cookie'
import React, { useState } from 'react'
import Login from './Login';

export default function Nav() {
    const pathname = usePathname();

    const geotoken = getCookie('geotoken');
    const [loginFlag, setLoginFlag] = useState(false)
    // console.log('geotoken',geotoken);

    

    const handleClick = (e,i) => {
        e.preventDefault();

        if(i==1){
            location.href='/';
            return false;
        }

        if(i==2){

            if(geotoken==undefined || geotoken==''){
                // setLoginFlag(true);
                window.location.href = 'https://www.microscooters.co.kr/member/login.php?rcMode=member';
            }else{
                location.href='/register';
            }
            
            return false;
        }


        if(i==3){
            if(geotoken==undefined || geotoken==''){
                // setLoginFlag(true);
                window.location.href = 'https://www.microscooters.co.kr/member/login.php?rcMode=member';
            }else{
                location.href='/inquiry';
            }
            
            return false;
        }

    }


    return (
        <>

        { loginFlag && <Login setLoginFlag={setLoginFlag}/>}

        <nav className={styles.nav}>
            <div className="wrap">
                <ul>
                    <li className={pathname == '/' ? styles.active : ''}><a href='/' onClick={(e)=>handleClick(e,1)}>리콜 안내</a></li>
                    <li className={pathname == '/register' ? styles.active : ''}><a href='/register'  onClick={(e)=>handleClick(e,2)}>리콜 접수</a></li>
                    <li className={pathname == '/inquiry' ? styles.active : ''}><a href='/inquiry'  onClick={(e)=>handleClick(e,3)}>조회 및 문의</a></li>
                </ul>
            </div>
        </nav>
        </>
    )
}
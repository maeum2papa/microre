"use client"

import { useRef, useState } from "react"
import { postApi } from "../services/api"
import styles from '../styles/modal.module.scss'
import { usePathname, useRouter } from "next/navigation"
import { getCookie, setCookie ,delCookie} from '../services/cookie'

export default function NonmemberModal({ setMemberOpen }) {
    const [formData, setFormData] = useState({
        name: '',
        mobile: ''
    })
    const [code, setCode] = useState('') //응답받은 인증코드
    const [codeInput, setCodeInput] = useState('') //인증코드 입력
    const codeRef = useRef()
    const mobileRef = useRef()

    //모바일 정규식
    const handleMobileChange = (e) => {
        setFormData(()=> {
            return {
                ...formData,
                mobile: e.target.value.replace( /[^0-9]/g, "")}
        })
    }

    //인증코드 정규식
    const handleCodeChange = (e)=>{
        setCodeInput(e.target.value.replace( /[^0-9]/g, ""))
    }

    const handleMemberCheck = async () => {
        let regMobile = /^01([0])-?([0-9]{3,4})-?([0-9]{4})$/;
        if(!regMobile.test(formData.mobile)){
            alert('휴대폰 번호를 확인해주세요.')
            mobileRef.current.focus();
            return
        }
        const res = await postApi({
            path: 'https://www.microscooters.co.kr/api/code',
            data: formData
        });
        const data = JSON.parse(res);

        if(data.msg=='ok'){
            setCode(data.code)
            codeRef.current.focus()
        }else{
            alert("네트워크 오류가 발생하였습니다. 잠시후에 다시 시도해 주세요.");
        }
    }

    const handleCodeCheck = async () => {

        if (codeInput != '' && code == codeInput && codeInput!=undefined) {
            const res = await postApi({
                path: 'https://www.microscooters.co.kr/api/guest',
                data: formData
            })
            
            const data = JSON.parse(res);
            
            if(data.msg=='ok'){
                setCookie('geotoken', data.token,{maxAge:(60*60)});
                location.reload();
            }else{
                alert("네트워크 오류가 발생하였습니다. 잠시후에 다시 시도해 주세요.");
            }
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    }

    return (
        <>
            <div className={styles.modal}>
                <input type="text" name="name" value={formData.name} placeholder="이름" onChange={(e)=>setFormData({ ...formData, name: e.target.value })}/>
                <input type="text" name="mobile" maxLength={11} ref={mobileRef} value={formData.mobile} placeholder="연락처" onChange={handleMobileChange}/>
                <button onClick={handleMemberCheck}>인증코드 전송</button>
                <input type="text" maxLength={4} placeholder="인증코드" value={codeInput} onChange={handleCodeChange} ref={codeRef}/>
                <button onClick={handleCodeCheck}>본인인증</button>
            </div>
            <div className={styles.mask} onClick={()=>setMemberOpen(false)}></div>
        </>
    )
}
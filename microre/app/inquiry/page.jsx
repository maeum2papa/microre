'use client';

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { usePathname, useRouter } from "next/navigation"
// import InquiryModal from '../components/InquiryModal'
// import NonmemberModal from '../components/NonmemberModal'
import { postApi } from '../services/api';
import { getCookie } from '../services/cookie';

export default function Inquiry() {
  const [inquiryOpen, setInpiryOpen] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [inquiry, setInquiry] = useState({})
  const router = useRouter()
  const geotoken = getCookie('geotoken');

  const getInquiry = async () => {
    const res = await postApi({
      path: 'https://www.microscooters.co.kr/api/load'
    })
    const data = res.data
    if(res.msg === "ok"){
      setInquiry( prevState => { 
        return {
          ...prevState, 
          ...data
        }
      })
    }
  }

  const handleMove = () => {
    router.push('https://www.microscooters.co.kr/service/qa')
  }

  useEffect(() => {
    if(!geotoken) {
      router.replace('/')
      // setInpiryOpen(true)
      return
    }
    getInquiry()
  }, [])


  return (
    <>
      {/* { inquiryOpen && <InquiryModal setInpiryOpen={setInpiryOpen} setMemberOpen={setMemberOpen}/> }
      { memberOpen && <NonmemberModal setMemberOpen={setMemberOpen}/> } */}
      <div className={styles.wrap}>
        <section className={styles.processArea}>
          <div>
            <p>
              접수 확인까지 최대 3일이 소요되며 <br className={styles.mobr}/>
              접수 양에 따라 지연될 수 있습니다.
            </p>
            <p>
              문의사항이 있으시다면, 고객센터 (070-4336-0700)로 <br className={styles.mobr}/>
              연락 주시기 바랍니다.
            </p>
          </div>

          <div className={styles.step}>
            <h4>진행 절차</h4>

            <div className={styles.step2}>
              <div>접수완료</div>
              <div>확인완료</div>
              <div>처리중</div>
              <div>처리완료</div>
            </div>
          </div>
        </section>
        <section className={styles.userInfoArea}>
            <h3>회원 정보</h3>
            <div>
              <ul>
                <li>
                  <div>이름</div>
                  <div>{inquiry?.member?.name}</div>
                </li>
                <li>
                  <div>연락처</div>
                  <div>{inquiry?.member?.mobile}</div>
                </li>
                <li>
                  <div>E-mail</div>
                  <div>{inquiry?.member?.email}</div>
                </li>
                <li>
                  <div>주소</div>
                  <div>{inquiry?.member?.address}</div>
                </li>
              </ul>
            </div>
        </section>
        <section className={styles.progressArea}>
          <h3>진행 상황</h3>
          <table className={styles.pcTable}>
            <thead>
              <tr>
                <th>접수일자</th>
                <th>서비스 구분</th>
                <th>진행 상황</th>
                {/* <th>주소</th>
                <th>환불 계좌</th> */}
                <th>접수번호</th>
              </tr>
            </thead>
            <tbody>
              {inquiry?.list?.map((list, index) => {
                return (
                  <tr key={index}>
                    <td>{list.regDate}</td>
                    <td>{list.recallType}</td>
                    <td className={styles.blue}>{list.state}</td>
                    {/* <td>{list.address}</td>
                    <td>{list.returnBank}</td> */}
                    <td>{list.regNumber}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <table className={styles.moTable}>
              {inquiry?.list?.map((list, index) => {
                return (
                  <tbody key={index}>
                    <tr key={index}>
                      <th>접수번호</th>
                      <td>{list.regNumber}</td>
                    </tr>
                    <tr>
                      <th>접수일자</th>
                      <td>{list.regDate}</td>
                    </tr>
                    <tr>
                      <th>서비스 구분</th>
                      <td>{list.recallType}</td>
                    </tr>
                    <tr>
                      <th>진행 상황</th>
                      <td className={styles.blue}>{list.state}</td>
                    </tr>
                    {/* <tr>
                      <th>주소</th>
                      <td>{list.address}</td>
                    </tr> */}
                    {/* <tr>
                      <th>환불 계좌</th>
                      <td>{list.returnBank ? list.returnBank : '-'}</td>
                    </tr> */}
                  </tbody>
                )
              })}
          </table>
        </section>
        <div className={styles.buttonArea}>
          <button onClick={handleMove}>리콜 관련 문의하기</button>
        </div>
      </div>
    </>
  )
}

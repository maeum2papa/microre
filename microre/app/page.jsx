"use client"


import styles from './page.module.scss'
import React, { useEffect, useState } from 'react'
import Pagination from '../app/components/Pagination'
import { postApi } from './services/api'
import { getCookie, setCookie ,delCookie} from './services/cookie'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { decrypt, jwtDecrypt } from './services/encrypt'
import Login from '../app/components/Login';
import Loading from './components/Loading';
import Popup from './components/Popup';

export default function Home() {
  const [formData, setFormData] = useState({
    searchKey : "",
    searchText : "",
    page: 1
  })
  const [noticeList, setNoticeList] = useState([])
  
  const searchParams = useSearchParams()
  // let geo = searchParams.get('geo')
  const router = useRouter()
  const [loginFlag, setLoginFlag] = useState(false)
  const [loadingFlug, setLoadingFlug] = useState(false)
  const [popup,setpopup] = useState([]);

  const handleGetNotice = async () => {
    
    const res = await postApi({
      path: 'https://www.microscooters.co.kr/api/notice',
      data: formData
    })
    const data = res.list
    setNoticeList((prevState)=>[...prevState, ...data.list])
  }

  const handlePopup = async () =>{

    const res = await postApi({
      path: 'https://www.microscooters.co.kr/api/popup'
    })

    if(res.msg=='ok'){

      

      res.list.forEach(e => {

        let popcookie = getCookie(`popup${e.sno}`);

        if(popcookie==1){

        }else{
          e.popupContent=e.popupContent.replace(/\\/g, '');
          e.popupContent=e.popupContent.replace('src="', 'src="https://cdn-pro-web-134-104.cdn-nhncommerce.com/geoinfotech_godomall_com');
          //https://cdn-pro-web-134-104.cdn-nhncommerce.com/geoinfotech_godomall_com/data/editor/design/230622/LDA-230601_131336.jpg

          setpopup((prevState)=>[...prevState,e]);
        }
        
      });

      
    }

  }


  useEffect( () => {  
    handlePopup();
    handleGetNotice();
  }, [])
  
  // useEffect(() => {
  //   console.log('geo:', geo);
  //   if(geo) {
  //     setLoadingFlug(true)
  //   } else {
  //     setLoadingFlug(false)
  //   }
  // }, [geo])

  const date = Math.round((new Date()).getTime() / 1000);
  const tokenExpire = date + 60 * 60

  
  
  const loginCheck = async () => {
    // const locationIp = await getIp() //ip

    
  }

  function delay() {
    return new Promise(() => {
      setTimeout(()=>{
        setLoadingFlug(false)
      }, 2000)
    })
  }

  const getIp = async () => {
    const ipData = await fetch('https://geolocation-db.com/json/')
    const locationIp = await ipData.json();
    return locationIp.IPv4
  }

  const handleRegist = (e) =>{
    e.preventDefault();

    const geotoken = getCookie('geotoken');

    if(geotoken!=undefined && geotoken!=''){
      location.href='/register';
      return false;
    }
    
    // setLoginFlag(true);
    window.location.href = 'https://www.microscooters.co.kr/member/login.php?rcMode=member';
  }


  const handleClose = (e)=>{
    // alert(e);
    const newPopup = popup.filter((item, index) => index !== e);
    setpopup(newPopup);

  }

  const handleCloseToday = (i,e) => {
    setCookie(`popup${e}`, 1, {maxAge:(60*60*24)});
    const newPopup = popup.filter((item, index) => index !== i);
    setpopup(newPopup);
  }

  const handleOpenPopup = () => {
    console.log('handleOpenPopup');
    console.log(popup);
    popup.forEach(ele => { 
      console.log(ele);
    })
  }
  useEffect(()=>{
    handleOpenPopup()
  }, [])
  return (
    <>
      { loginFlag && <Login setLoginFlag={setLoginFlag}/>}
      { loadingFlug &&  <Loading />}
      
      { popup.length>0 && <>
        <div className={styles.popContainer}>
        {popup.map((value, index) => (
          <div key={index}>
            <Popup data={value} handleClose={()=>handleClose(index)} handleCloseToday={()=>handleCloseToday(index,value.sno)}></Popup>
            </div>
        ))}
        </div>
      </>}

      

      <div className={styles.wrap}>


        <section className={styles.descriptionArea}>
          <div>
            <div>
              <h2 className={styles.h2}>마이크로 바이크 16인치(1.0) 리콜 안내</h2>
              <p className={styles.pc}>안녕하세요 마이크로 바이크 입니다.<br/>
마이크로 바이크 16인치 리콜 대상자 분들께서는<br/>
아래의 안내(절차)에 따라 리콜 접수를 해주시기 바랍니다.<br/>
<br/>
고객님들께 불편을 끼쳐 드린 것에 대해 사과의 말씀을 드리며,<br/>
조속한 조치로 불편을 최소화하도록 노력하겠습니다.<br/>
<br/>
리콜에 관련된 자세한 내용은 아래 공지사항에서 확인 가능합니다.<br/>
추가 문의 사항등은 접수후 조회 및 문의 페이지에서 1:1 문의로<br/>
부탁드립니다.</p>
          <p className={styles.mo}>안녕하세요 마이크로 바이크입니다.<br/>
마이크로 바이크 16인치 리콜 대상자분들께서는<br/>
아래의 안내(절차)에 따라 리콜 접수를 해주시기 바랍니다.<br/>
<br/>
고객님들께 불편을 끼쳐 드린 것에 대해<br/>
사과의 말씀을 드리며,<br/>
조속한 조치로 불편을 최소화하도록 노력하겠습니다.<br/>
<br/>
리콜에 관련된 자세한 내용은<br/>
아래 공지사항에서 확인 가능합니다.<br/>
추가 문의사항 등은 접수 후 조회 및 문의 페이지에서<br/>
1:1 문의로 부탁드립니다.</p>
            </div>
            <div><img src="/bike.png" alt=""/></div>
          </div>
        </section>



        <section className={styles.recallStepInfo}>
          <h3>리콜 접수 절차 안내</h3>
          <div className={styles.step1}>
            <div onClick={handleRegist}><span>01</span>회원가입 및 로그인</div>
            <div onClick={handleRegist}><span>02</span>리콜 접수</div>
            <div><span>03</span>확인 및 처리</div>
          </div>

          <h4>리콜 접수 후 진행 절차</h4>

          <div className={styles.step2}>
            <div>접수완료</div>
            <div>확인완료</div>
            <div>처리중</div>
            <div>처리완료</div>
          </div>

        </section>

        <section className={styles.noticeArea}>
          <h3>공지사항</h3>
          <div className={styles.list}>
            {noticeList?.map((list, index) => {
              return (
                <div key={list.sno} className={styles.item}>
                  <Link href={`/detail/${list.sno}`}>
                    <div className={styles.imgWrap} style={{height:'238px',backgroundImage: `url(${list.thumb})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", backgroundPosition:"center"}}>
                    </div>
                  </Link>
                  <Link href={`/detail/${list.sno}`} className={styles.title}>{list.subject}</Link>
                  <div className={styles.date}>{list.regDt}</div>
                </div>
              )
            })}
          </div>
          {/* <table>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
                {
                  noticeList?.map((list, index) => {
                    return (
                      <React.Fragment key={list.sno}>
                        <tr onClick={()=>{handleNoticeClick(index)}}>
                          <td>{list.sno}</td>
                          <td>{list.subject}</td>
                          <td>관리자</td>
                          <td>{list.date}</td>
                        </tr>
                        <tr className={`${styles.noticeContent} ${noticeContent ? styles.show : ''}`}>
                          <td colSpan={5} >
                            <div>
                              {list.contents}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })
                }
            </tbody>
          </table> */}
          {/* <div className={styles.pagination}>
            <Pagination 
              noticeList={noticeList} 
              setFormData={setFormData}
            />
          </div> */}
        </section>
        {/* <div className={styles.searchArea}>
          <select name="" id="">
            <option value="">제목</option>
            <option value="">내용</option>
          </select>
          <input type="text" />
          <button>검색</button>
        </div> */}
        <div className={styles.buttonArea}>
         <button type="button" onClick={(e)=>handleRegist(e)}>리콜 접수 신청</button>
        </div>
      </div>
    </>
  )
}

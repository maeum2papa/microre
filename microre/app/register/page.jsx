"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import styles from './page.module.scss'
// import NonmemberModal from '../components/NonmemberModal'
import DaumPostcode from '../components/DaumPostcode'
import { resizeImage } from '../services/resizeimage'
import { postApi } from "../services/api"
import { getCookie } from "../services/cookie"
import { decrypt } from "../services/encrypt"

export default function Register() {
  const recallType = ["자가교체"]
  const store = ["온라인", "백화점", "공식대리점", "선물", "기타"]
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    mobile: "",
    email: "",
    store: store[0],
    buyDate: "",
    orderNum: "",
    price: null,
    recallType: recallType[0],
    // returnBank: "",
    zipCode: "",
    zoneCode: "",
    address: "",
    addressSub: "",
    file: [],
    serial:""
  })
  const [bankData, setBankData] = useState({
    bank: '',
    account: '',
    depositor: ''
  })
  
  const [checked, setChecked] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [postcodeOpen, setPostcodeOpen] = useState(false)
	const [selectedFiles, setSelectedFiles] = useState([]);
  const nextInput = useRef(0)
  const inputRef = useRef([]);
  // const recallType = ["부품교체", "제품 교환", "환불"]
  const router = useRouter()
  const geotoken = getCookie('geotoken');

  const handleInput = (e) => {
    setFormData( prevState => {
      return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  }

  // const handleBankInput = (e) => {
  //   setBankData(prevState => {
  //     return {
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }})
  // }

  //파일 input 추가, 삭제
  // const handleFileInputAdd = () => {
  //   const input = { id: nextInput.current, value: "" }
  //   setFileInput([...fileInput, input])
  //   nextInput.current += 1
  // }

  // const handleFileInputDelete = (i) => {
  //   setFileInput(fileInput.filter(input => input.id !== i))
  // }

  const handleFileInputChange = async (e, index) => {
    const files = e.target.files
    const filesArray = []
    const filesArrayName = [];
    for(const key in files) {
      if(typeof files[key] === 'object') {
        
        const resizeImg = await resizeImage(files[key])
        filesArray.push(resizeImg)

        filesArrayName.push(files[key].name);
      }
    } 
    setFormData((prevState) => {
      return {
        ...prevState,
        file: filesArray,
      }
    })

    
    inputRef.current[7].innerHTML = filesArrayName.join(", ");
  }


  const handleSubmit = async () => {
    // console.log('formData:', formData);
    //입력 필수항목
    if(inputRef.current[0].value === ''){
      alert("이름은 필수 입력사항입니다.");
      inputRef.current[0].focus();
      return false;
    } 
    if(inputRef.current[1].value === ''){
      alert("연락처는 필수 입력사항입니다.");
      inputRef.current[1].focus();
      return false;
    } 
    
    if(inputRef.current[2].value === ''){
      alert("이메일은 필수 입력사항입니다.");
      inputRef.current[2].focus();
      return false;
    } 

    if(formData.zoneCode==''){
      alert("받는 곳은 필수 입력사항입니다.");
      return false;
    }

    if(formData.address==''){
      alert("받는 곳은 필수 입력사항입니다.");
      return false;
    }

    if(formData.addressSub==''){
      alert("받는 곳은 필수 입력사항입니다.");
      return false;
    }


    //리콜 방법 환불일 시 입력 필수항목
    // if(formData.recallType === '환불'){
    //   if(inputRef.current[3].value === ''){
    //     alert("은행명은 필수 입력사항입니다.");
    //     inputRef.current[3].focus();
    //     return
    //   }
    //   if(inputRef.current[4].value === ''){
    //     alert("계좌번호는 필수 입력사항입니다.");
    //     inputRef.current[4].focus();
    //     return
    //   }
    //   if(inputRef.current[5].value === ''){
    //     alert("예금주는 필수 입력사항입니다.");
    //     inputRef.current[5].focus();
    //     return
    //   }
    // }
    // if(inputRef.current[6].value === ''){
    //   alert("받는 곳은 필수 입력사항입니다.");
    //   return
    // }
    if(!checked){
      alert("개인정보 수집에 동의해주세요.");
      return
    }
    
    //은행 정보 join
    // const returnBank = []
    // for(let key in bankData) {
    //   returnBank.push(bankData[key])
    // }
    // const returnBankJoin = returnBank.join(' ')
    if(geotoken) {
      // setFormData( prevState => { 
      //   return {
      //     ...prevState, 
      //     returnBank: returnBankJoin
      //   }}
      // )
      // console.log('formData.serial:', typeof formData.serial);
      const res = await postApi({
        path: 'https://www.microscooters.co.kr/api/save',
        data: formData
      })
      if(res.msg === "ok") {
        if(!formData.serial) {
          router.push(`/inquiry`)
        } else {
          router.push(`/inquiry?serial=${formData.serial}`)
        }
      } 
    } else {
      alert('로그인 해주세요.')
      router.push('/')
    }
    // setInpiryOpen(true)
  }

  const handlePostCode = {
    click: () => setPostcodeOpen(true),
    selectAddress: (data) => {
      setFormData( prevState => { 
        return {
        ...prevState, 
        zipCode: data.postcode,
        zoneCode: data.zonecode,
        address: data.address,
      }})
      setPostcodeOpen(false)
    }
  }


  const getInfo = async () => {
      const res = await postApi({
          path: 'https://www.microscooters.co.kr/api/info'
      })
      console.log(res.data[0]);
      if(res.msg=='ok'){
        setFormData( prevState => { 
          return {
            ...prevState, 
            id: res.data[0].memId,
            name: res.data[0].memNm,
            mobile: res.data[0].cellPhone,
            email : res.data[0].email,
            zoneCode: res.data[0].zoneCode,
            address: res.data[0].address,
            addressSub: res.data[0].addressSub,
          }}
        )
        // console.log(res.data[0]);

      } 
  }

  const handleFileClick = () => {
    inputRef.current[8].click();
  }


  const [serialFindViewFlag,setSerialFindViewFlag] = useState(false);

  const handleSerialFind = () =>{
    setSerialFindViewFlag(true);
  }

  const handleMaskClose = () =>{
    setSerialFindViewFlag(false);
  }

  useEffect(() => {
  
    if(geotoken==undefined || geotoken==''){
      location.replace('/');
      return false;
    }
      
    getInfo();

    // if(!document.cookie) {
    //   router.replace('/')
    // }
  }, [])
  
  return (
    <>
      {/* { memberOpen && <NonmemberModal setMemberOpen={setMemberOpen}/> } */}
      { postcodeOpen && <DaumPostcode selectAddress={handlePostCode.selectAddress} setPostcodeOpen={setPostcodeOpen} />}
      <div className={styles.wrap}>
        <section className={styles.formArea}>
          <ul>
            <li>
                <label className={styles.require}>회원정보</label>
                <div>
                <input type="text" value={formData.id || ''} readOnly={true}/>
                  <input type="text" value={formData.name || ''} onChange={handleInput} name="name" placeholder="이름" ref={el => inputRef.current[0] = el} />
                  <input type="text" value={formData.mobile || ''} onChange={handleInput} name="mobile" placeholder="연락처" ref={el => inputRef.current[1] = el} />
                  <input type="text" value={formData.email || ''} onChange={handleInput} name="email" placeholder="이메일" ref={el => inputRef.current[2] = el} />
                </div>
            </li>

            <li>
              <label className={styles.require}>받는 곳</label>
              <div>
                <div>
                  <input type="text" value={formData.zoneCode || ''} onChange={handleInput}/>
                  <button onClick={handlePostCode.click}>우편번호</button>
                </div>
                <div>
                  <input type="text" value={formData.address || ''} onChange={handleInput}/>
                  <input type="text" name="addressSub" value={formData.addressSub || ''} onChange={handleInput}/>
                </div>
              </div>
            </li>
            
            <li>
                <label className={styles.require}>구매처</label>
                <div>
                  <select name="store" onChange={handleInput} id="">
                    {store.map((type, index) => {
                        return (
                          <option key={index} value={type}>{type}</option>
                        )
                    })}
                  </select>
                </div>
            </li>
            <li>
                <label>구매일자</label>
                <div>
                  <input type="date" name="buyDate" value={formData.buyDate} onChange={handleInput} />
                </div>
            </li>
            <li>
                <label>주문번호</label>
                <div>
                  <input type="text" name="orderNum" value={formData.orderNum || ''} onChange={handleInput} placeholder="온라인으로 주문하신 고객님들만 작성해 주세요." />
                </div>
            </li>
            <li>
                <label>시리얼넘버</label>
                <div className={styles.serialFind}>
                  <div><input type="text" name="serial" value={formData.serial || ''} onChange={handleInput}  placeholder="주문번호를 모를경우 제품의 시리얼 넘버를 입력해주세요."/></div>
                  <div><button type='button' onClick={()=>{handleSerialFind()}}>시리얼 번호 위치 확인하기</button></div>
                </div>
            </li>
            <li style={{display:'none'}}>
                <label>구매금액</label>
                <div>
                  <input type="number" name="price" value={formData.price || ''} onChange={handleInput} />
                </div>
            </li>
            <li>
                <label className={styles.require}>부품 교체 방법</label>
                <div>
                  <select name="recallType" onChange={handleInput} id="" >
                    {recallType.map((type, index) => {
                      return (
                        <option key={index} value={type}>{type}</option>
                      )
                    })}
                  </select>

                  <p className={styles.recallTypeDesc}>
                  *자가교체 : 교체 부품을 택배로 발송, 간단하게 직접 교체 가능합니다.<br/>
                  * 교체 영상 바로가기 <a href="https://youtu.be/aBk8yehW1iw?si=hz9p76F2q2b5rMkH" target="_blank" rel="noreferrer">https://youtu.be/aBk8yehW1iw?si=hz9p76F2q2b5rMkH</a><br/>
                  * 교체 부품은 택배로 발송됩니다.
                  </p>
                </div>
            </li>
            {
            // formData.recallType === '환불' && <li>
            //     <label className={styles.require}>환불계좌</label>
            //     <div>
            //       <input type="text" name="bank" placeholder="은행명" value={bankData.bank || ''} onChange={handleBankInput} ref={el => inputRef.current[3] = el}/>
            //       <input type="text" name="account" placeholder="계좌번호" value={bankData.account || ''} onChange={handleBankInput} ref={el => inputRef.current[4] = el}/>
            //       <input type="text" name="depositor" placeholder="예금주" value={bankData.depositor || ''} onChange={handleBankInput} ref={el => inputRef.current[5] = el}/>
            //     </div>
            // </li>
            }
            
            
            <li>
                <label>파일첨부</label>
                <div>
                {/* {fileInput.map((input, index) => {
                  return (
                    <div key={index}>
                      <input 
                        type="file" 
                        name="file" 
                        placeholder="(jpg.png 2M이하)"
                        onChange={e => handleFileInputChange(e, index)}
                        value={input.title}
                        onClick={handleFile}
                      />
                      {index === 0 
                        ? <button onClick={handleFileInputAdd}>+</button>
                        : <button onClick={() => handleFileInputDelete(input.id)}>-</button>
                      }
                    </div>
                  )
                })} */}
                <div className={styles.vinput} onClick={handleFileClick}>
                  <div ref={el => inputRef.current[7] = el}>파일선택</div>
                  <div>(jpg,png 2M이하)</div>
                </div>
                <div className={styles.desc}>* 주문번호 캡쳐, 영수증, 시리얼넘버 촬영본 등을 첨부해주세요</div>
                <input type="file" onChange={handleFileInputChange} multiple ref={el => inputRef.current[8] = el} />
              </div>

            </li>
            <li>
                <label className={styles.require}>개인정보 활용 동의</label>
                <div>
                  <table className={styles.pcTable}>
                    <thead>
                      <tr>
                        <th>수집하는 개인정보 항목</th>
                        <th>수집 및 이용 목적</th>
                        <th>보유 및 이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>이름, 연락처, 이메일, 우편번호, 주소</td>
                        <td>리콜 관련 업무 처리 및 택배 발송</td>
                        <td>활용 후 1년 뒤 파기</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className={styles.moTable}>
                  <tbody>
                      <tr>
                        <th>수집하는 개인정보 항목</th>
                        <td>이름, 연락처, 이메일, 우편번호, 주소</td>
                      </tr>
                      <tr>
                        <th>수집 및 이용 목적</th>
                        <td>리콜 관련 업무 처리 및 택배 발송</td>
                      </tr>
                      <tr>
                        <th>보유 및 이용기간</th>
                        <td>활용 후 1년 뒤 파기</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className={styles.personal}>
                    <p>
                      서비스 제공을 위해 필요한 최소한의 개인정보이므로, 동의를 해 주셔야 서비스를 이용하실 수 있습니다.
                    </p>
                    <label>
                      <input type="checkbox" onChange={(e) => {setChecked(e.target.checked)}}/> 개인정보수집에 대한 내용을 읽었으며, 이에 동의합니다.
                    </label>
                  </div>
                </div>
            </li>
          </ul>
        </section>
        <div className={styles.buttonArea}>
          <button onClick={handleSubmit}>리콜 접수 신청</button>
        </div>
        
        { serialFindViewFlag &&  
          <>
          <div className={styles.serialFindView}>
            <img src="/serialfind.jpg" alt=""/>
          </div>
          <div className={styles.mask} onClick={()=>handleMaskClose()}></div>
          </>
        }
      </div>
    </>
  )
}

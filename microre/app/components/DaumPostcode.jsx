import React from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'
import styles from '../styles/modal.module.scss'

export default function DaumPostcode({selectAddress, setPostcodeOpen}) {
  return (
    <>
      <div className={`${styles.modal}`}>
        <DaumPostcodeEmbed onComplete={selectAddress}/>
      </div>
      <div className={styles.mask} onClick={()=>setPostcodeOpen(false)}></div>
    </>
  )
}
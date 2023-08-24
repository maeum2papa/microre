"use client"

import { useRouter } from 'next/navigation'
import { setCookie } from "../services/cookie"
import React, { useEffect } from 'react'

export default function Logout() {

  const router = useRouter()
  

  setCookie('geotoken', "", {maxAge:0});

  useEffect(()=>{
    // router.replace('/');
    location.replace('/');
  })
  
  return (
    <></>
  )
}

'use client';

import React, { useEffect, useState } from 'react'
import RegisterModal from './RegisterModal'
import NonmemberModal from './NonmemberModal'

export default function Nav({setLoginFlag}) {
    
    const [memberOpen, setMemberOpen] = useState(false)

    return (
        <>
        { memberOpen==false && <RegisterModal setLoginFlag={setLoginFlag} setMemberOpen={setMemberOpen}/>}
        { memberOpen && <NonmemberModal setMemberOpen={setMemberOpen}/> }
        </>
    )
}
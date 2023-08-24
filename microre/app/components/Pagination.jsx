'use client'
import React, { useEffect, useState } from 'react'

export default function Pagination({ noticeList, setFormData }) {
  const [page, setPage] = useState(1)
  const [pageArray, setPageArray] = useState([])
  
  const totalLength = 2;
  const limit = 10
  let totalPage = Math.ceil(totalLength/limit)
  let area = Math.floor(page/limit)
  let start =  area + limit //노출될 page 숫자 시작
  let end = start + limit - 1; //노출될 page 숫자 끝
  end = end > totalPage ? totalPage : end

  const pageNum = []
  for(let i = start; i < end; i++) {
    pageNum.push(i)
  }
  setPageArray(pageNum)
  
  useEffect(()=>{
    // console.log('noticeList.totalCount:', noticeList.totalCount);
  }, [])
  return (
    <div>
        <button>&lt;</button>
        { pageArray.map((page)=>{
            <button>{page}</button>
        })}
        <button>&gt;</button>
    </div>
  )
}

"use client"
import { usePathname, useRouter } from 'next/navigation'
import styles from './page.module.scss'
import { useEffect, useState } from "react"
import { postApi } from "@/app/services/api"

export default function DetailPage({params}) {
    const router = useRouter()
    const pathname = usePathname()
    const snoPath = pathname.replace("/detail/", "")
    const [notice, setNotice] = useState({})

    useEffect(()=>{
        getNotice()
    }, [])

    const getNotice = async () => {

        const res = await postApi({
            path: 'https://www.microscooters.co.kr/api/noticeView',
            data: { sno: snoPath }
        })
        
        const deRes = JSON.parse(res);

        setNotice(deRes.view);
        
    }

    return (
        <>
          <div className={styles.wrap}>
            <section className={styles.titleArea}>
                <h2 className={styles.title}>{notice.subject}</h2>
                <div className={styles.date}>{notice.date}</div>
            </section>
            <section className={styles.contentsArea}>
                <div dangerouslySetInnerHTML={{ __html: notice.contents }} />
            </section>
            <div className={styles.buttonArea}>
                <button onClick={()=>router.push('/')}>목록보기</button>
            </div>
          </div>
        </>
    )
}
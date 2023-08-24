import styles from '../styles/loading.module.scss'

export default function Loading() {
    return (
        <>
            <div class={styles.loading}></div>
            <div class={styles.mask}></div>
        </>
    )
}
import styles from './loadingMaquina.module.css'

const LoadingMaquina = () => {
    return(
        <div className={styles.loadingOverlay}>
            <div className={styles.typewriter}>
                <div className={styles.slide}><i></i></div>
                <div className={styles.paper}></div>
                <div className={styles.keyboard}></div>
            </div>
        </div>
    )
}

export default LoadingMaquina
import React from 'react'
import styles from './homeBody.module.css'
import CardProfile from './cardProfile/CardProfile'

const HomeBody = () => {
    return(
        <div className={styles.container}>
            <div className={styles.containerMainBody}>

            </div>
            
            <div className={styles.containerSideBar}>
                <CardProfile/>
            </div>
        </div>
    )
}

export default HomeBody
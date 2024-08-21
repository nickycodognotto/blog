import React from 'react'
import styles from './homeBody.module.css'
import CardProfile from './cardProfile/CardProfile'
import SearchBar from './SearchBar/SearchBar'

const HomeBody = () => {
    return(
        <div className={styles.container}>

            <section className={styles.sectionMainBody}>
                
            </section>

            <section className={styles.sectionSideBar}>
                <CardProfile/>
                <SearchBar />
            </section>
            
        </div>
    )
}

export default HomeBody
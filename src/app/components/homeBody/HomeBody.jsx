import React from 'react'
import styles from './homeBody.module.css'
import CardProfile from './cardProfile/CardProfile'
import SearchBar from './SearchBar/SearchBar'
import FilterButton from './filterButton/FilterButton'
import CardPost from './cardPost/CardPost'

const HomeBody = () => {
    return(
        <div className={styles.container}>
            
            <section className={styles.sectionMainBody}>
                <CardPost />
            </section>

            <section className={styles.sectionSideBar}>
                <CardProfile/>
                <div className={styles.boxSearchBar}>
                    <SearchBar />
                    <FilterButton />
                </div>
            </section>
        </div>
    )
}

export default HomeBody
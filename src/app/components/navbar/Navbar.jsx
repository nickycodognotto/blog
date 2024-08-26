import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from '../authlinks/AuthLinks'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftLinks}>
                <Link href="/">home</Link>
                <Link href="/">sobre mim</Link>
                <Link href="/postagens">postagens</Link>
            </div>
            <div className={styles.name}>
                <h1 className={styles.tituloSacramento}>doce amargo</h1>
            </div>
            <div className={styles.rightLinks}>
                <Link href="/">portifólio</Link>
                <Link href="/">contato</Link>
                <AuthLinks />
            </div>
        </div>
    )
}

export default Navbar
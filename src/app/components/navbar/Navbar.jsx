import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return(
        <div className={styles.container}>
            <div className={styles.name}>
                <h1 className={styles.tituloSacramento}>doce amargo</h1>
            </div>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                <Link href="/">Sobre mim</Link>
                <Link href="/">Postagens</Link>
                <Link href="/">Entrar</Link>
            </div>
        </div>
    )
}

export default Navbar
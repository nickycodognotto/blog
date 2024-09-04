"use client"
import React, { useState } from 'react';
import styles from './navbar.module.css';
import Link from 'next/link';
import AuthLinks from '../authlinks/AuthLinks';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.leftLinks}>
                <Link href="/">home</Link>
                <Link href="/sobre">sobre mim</Link>
                <Link href="/postagens">postagens</Link>
            </div>
            <div className={styles.name}>
                <Link href="/"><h1 className={styles.tituloSacramento}>doce amargo</h1></Link>
            </div>
            <div className={styles.rightLinks}>
                <Link href="/fotos">fotografias</Link>
                <Link href="/">contato</Link>
                <AuthLinks />
            </div>
            <div className={styles.burger} onClick={() => setOpen(!open)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            {open && (
                <div className={styles.responsiveMenu}>
                    <div className={styles.responsiveLinks}>
                        <Link href="/">home</Link>
                        <Link href="/sobre">sobre mim</Link>
                        <Link href="/postagens">postagens</Link>
                        <Link href="/fotos">fotografias</Link>
                        <Link href="/">contato</Link>
                    </div>
                    <AuthLinks />
                </div>
            )}
        </div>
    );
};

export default Navbar;

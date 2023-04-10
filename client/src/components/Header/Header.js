import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@mui/material';
import styles from './Header.module.css'

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerBody}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerLogo}>
                            <Link to="/home">
                                <svg className={styles.headerSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                            </Link>
                        </div>
                        <nav className={styles.headerNav}>
                            <Link to="/other">
                                <Button color='primary' variant='contained'>other</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

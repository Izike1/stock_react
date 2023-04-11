import * as React from 'react'
import { Link } from 'react-router-dom'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import styles from './Header.module.css'

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerBody}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerLogo}>
                            <Link to="/home">
                                <HomeIcon color="primary" fontSize="large" />
                            </Link>
                        </div>
                        <nav className={styles.headerNav}>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant='text'
                                onClick={handleClick}
                            >
                                Profile
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link className={styles.headerLink} to="/profile">Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link className={styles.headerLink} to="/inventory">
                                        My inventory
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link className={styles.headerLink} to='/logout'>Logout</Link>
                                </MenuItem>
                            </Menu>
                            {/*<Link to="/other">
                                <Button color='primary' variant='contained'>other</Button>
                            </Link>*/}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

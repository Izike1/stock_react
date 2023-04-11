import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import styles from './Inventory.module.css'

export default function Inventory() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <main className={styles.page}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={16}>
                            <Item>Item</Item>
                        </Grid>
                        <Grid item xs={16}>
                            <Item>Item</Item>
                        </Grid>
                        <Grid item xs={16}>
                            <Item>Item</Item>
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </>
    );
}
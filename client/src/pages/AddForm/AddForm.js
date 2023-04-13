import React from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from './AddForm.module.css'

export default function AddForm() {
    return (
        <>
            <Paper variant="outlined" className={styles.AddFormContent}>
                <Typography className={styles.AddFormTitle} variant="h3" component="h3">
                    Add a position
                </Typography>
                <TextField
                    variant="outlined"
                    className={styles.field}
                    label='1'
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    className={styles.field}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    className={styles.field}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    className={styles.field}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    className={styles.field}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    className={styles.field}
                    fullWidth
                />
                <Button>Add</Button>
            </Paper>
        </>
    );
}
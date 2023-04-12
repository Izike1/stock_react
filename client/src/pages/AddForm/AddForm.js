import React from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from './AddForm.module.css'

export default function AddForm() {
    return (
        <>
            <main className={styles.addFormPage}>
                <Paper>
                    <Typography>

                    </Typography>
                    <TextField />
                    <Button>ads</Button>
                </Paper>
            </main>
        </>
    );
}
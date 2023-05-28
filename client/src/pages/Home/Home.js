import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from "./Home.module.css";
import {fetchOrders} from "../../redux/slices/stockSlice";

export default function Home() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchOrders())
    },[])

    return (
        <>
            <main className={styles.homePage}>
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*{rows.map((row) => (*/}
                                {/*    <TableRow*/}
                                {/*        key={row.name}*/}
                                {/*        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                                {/*    >*/}
                                {/*        <TableCell component="th" scope="row">*/}
                                {/*            {row.name}*/}
                                {/*        </TableCell>*/}
                                {/*        <TableCell align="right">{row.calories}</TableCell>*/}
                                {/*        <TableCell align="right">{row.fat}</TableCell>*/}
                                {/*        <TableCell align="right">{row.carbs}</TableCell>*/}
                                {/*        <TableCell align="right">{row.protein}</TableCell>*/}
                                {/*    </TableRow>*/}
                                {/*))}*/}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button className={styles.pageButton}><Link className={styles.homeLink} to="/addform">Add a position</Link></Button>
                </>
            </main >
        </>
    );
}
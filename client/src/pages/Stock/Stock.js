import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchStock, fetchAddStock } from "../../redux/slices/stockSlice";

import { TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from "../../assets/styles/Styles.module.css";

export default function Stock() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            description: '',
            status: '',
            data_order: ''
        }
    })
    const { items: stocks, status } = useSelector(state => state.stock.stocks);


    React.useEffect(() => {
        dispatch(fetchStock())
    }, [dispatch])

    const onSubmit = (value) => {
        dispatch(fetchAddStock(value));
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <main className={styles.homePage}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Склады
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Адресс</TableCell>
                                <TableCell align="right">Имя</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status === "loading" ? (
                                <TableRow>
                                    <TableCell colSpan={4}>Загрузка...</TableCell>
                                </TableRow>
                            ) : status === "error" ? (
                                <TableRow>
                                    <TableCell colSpan={4}>Ошибка при загрузке заказов.</TableCell>
                                </TableRow>
                            ) : (
                                stocks.map((obj, index) => (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {obj.address}
                                        </TableCell>
                                        <TableCell align="right">{obj.name}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => handleOpen(obj.id)}>Изменить</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button>
                    <Link className={styles.homeLink} onClick={handleOpen}>
                        Добавить склад
                    </Link>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Изменить/Добавить заказ</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.address?.message)}
                                {...register('address', { required: 'Пустое поле' })}
                                label='Адресс'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.name?.message)}
                                {...register('name', { required: 'Пустое поле' })}
                                label='Имя'
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' onClick={handleSubmit(onSubmit)}>Изменить/Добавить</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    );
}
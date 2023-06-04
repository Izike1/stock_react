import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchAddOrderSlice, fetchOrders, fetchUpdateOrder, fetchDeleteOrder } from "../../redux/slices/ordersSlice";
import { useForm } from 'react-hook-form';

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

export default function Home() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            description: '',
            status: '',
            data_order: ''
        }
    })
    const { items: orders, status } = useSelector(state => state.order.orders);


    React.useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const onSubmit = (value) => {
        if (orderId) {
            console.log('id = ', orderId)
            dispatch(fetchUpdateOrder({ id: orderId, ...value }));
        } else {
            dispatch(fetchAddOrderSlice(value));
        }
        handleClose();
    }

    const handleDelete = (value) => {
        if (orderId) {
            dispatch(fetchDeleteOrder({ id: orderId, ...value }))
        }
        handleClose();
    }

    const handleOpen = (orderId) => {
        setOpen(true);
        setOrderId(orderId);
    }

    const handleClose = () => {
        setOpen(false);
        setOrderId(null);
    }

    return (
        <>
            <main className={styles.root}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Заказы
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Описание</TableCell>
                                <TableCell align="right">Дата создания</TableCell>
                                <TableCell align="right">Статус</TableCell>
                                <TableCell align="right">Действия</TableCell>
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
                                orders.map((obj, index) => (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {obj.description}
                                        </TableCell>
                                        <TableCell align="right">{obj.data_order}</TableCell>
                                        <TableCell align="right">{obj.status}</TableCell>
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
                        Добавить позицию
                    </Link>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Изменить/Добавить заказ</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.description?.message)}
                                {...register('description', { required: 'Пустое поле' })}
                                label='Описание заказа'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.status?.message)}
                                {...register('status', { required: 'Пустое поле' })}
                                label='Статус заказа'
                                fullWidth
                            />
                            <p>Дата создания заказа</p>
                            <input
                                type="date"
                                {...register('data_order', { required: 'Пустое поле' })}
                                className={styles.field}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" type="submit" onClick={handleDelete}>Удалить</Button>
                        <Button type='submit' onClick={handleSubmit(onSubmit)}>Изменить/Добавить</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    );
}
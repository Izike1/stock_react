import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchCreateCustomer, fetchCustomer } from "../../redux/slices/customerSlice";

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

import styles from '../../assets/styles/Styles.module.css'

export default function Customer() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            description: '',
            status: '',
            data_order: ''
        }
    })
    const { items: customers, status } = useSelector(state => state.customer.customers);

    React.useEffect(() => {
        dispatch(fetchCustomer)
    }, [dispatch])

    const onSubmit = (data) => {
        dispatch(fetchCreateCustomer(data))
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <main className={styles.root}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Клиенты
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
                                customers.map((obj, index) => (
                                    <>
                                        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {obj.name}
                                            </TableCell>
                                            <TableCell align="right">{obj.telephone}</TableCell>
                                            <TableCell align="right">{obj.description_order}</TableCell>
                                            <TableCell align="right">{obj.quantity_order}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={() => handleOpen(obj.id)}>Изменить</Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button>
                    <Link className={styles.homeLink} onClick={handleOpen}>
                        Добавить клиента
                    </Link>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Изменить/Добавить клиента</DialogTitle>
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
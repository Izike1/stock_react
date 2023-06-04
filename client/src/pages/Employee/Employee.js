import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, fetchCreateEmployee } from '../../redux/slices/employeeSlice';
import { Link } from 'react-router-dom';
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

import styles from '../../assets/styles/Styles.module.css'

export default function Employee() {
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            job_title: '',
            date_of_employment: '',
            salary: '',
        },
        mode: 'onChange'
    });
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const { items: employees, status } = useSelector(state => state.employee.employees);


    React.useEffect(() => {
        dispatch(fetchEmployee())
    }, [dispatch])

    const onSubmit = (value) => {
        console.log(value)
        dispatch(fetchCreateEmployee(value));
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <main className={styles.root}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Сотрудники
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>Имя</TableCell>
                                <TableCell align="right">Фамилия</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">Должность</TableCell>
                                <TableCell align="right">Зарплата</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status === "loading" ? (
                                <TableRow>
                                    <TableCell colSpan={3}>Загрузка...</TableCell>
                                </TableRow>
                            ) : status === "error" ? (
                                <TableRow>
                                    <TableCell colSpan={3}>Ошибка при загрузке сотрудников.</TableCell>
                                </TableRow>
                            ) : (
                                employees.map((obj, index) => (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align='right' component="th" scope="row">
                                            {obj.name}
                                        </TableCell>
                                        <TableCell align='right'>{obj.surname}</TableCell>
                                        <TableCell align="right">{obj.email}</TableCell>
                                        <TableCell align="right">{obj.job_title}</TableCell>
                                        <TableCell align="right">{obj.salary}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button>
                    <Link className={styles.homeLink} onClick={handleOpen}>
                        Добавить сотрудника
                    </Link>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Добавить сотрудника</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('name', { required: 'Пустая строка' })}
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                                label='Имя'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('surname', { required: 'Пустая строка' })}
                                error={Boolean(errors.surname?.message)}
                                helperText={errors.surname?.message}
                                label='Фамилия'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('email', { required: 'Пустая строка' })}
                                error={Boolean(errors.email?.message)}
                                helperText={errors.email?.message}
                                label='Email'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('password', { required: 'Пустая строка' })}
                                type='password'
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                label='Password'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('job_title', { required: 'Пустая строка' })}
                                error={Boolean(errors.job_title?.message)}
                                helperText={errors.job_title?.message}
                                label='Должность'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                {...register('salary', { required: 'Пустая строка' })}
                                error={Boolean(errors.salary?.message)}
                                helperText={errors.salary?.message}
                                label='Зарплата'
                                fullWidth
                            />
                            <p>Дата принятия на работу</p>
                            <input
                                type="date"
                                {...register('date_of_employment', { required: 'Пустое поле' })}
                                className={styles.field}
                            />
                            <DialogActions>
                                <Button type='submit'>Добавить</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </main>
        </>
    );
}
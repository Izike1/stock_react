import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchProviders, fetchCreateProvider, fetchDeleteProvider} from "../../redux/slices/providerSlice.js";

import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

import styles from '../../assets/styles/Styles.module.css'


function Provider() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [providerId, setProviderId] = React.useState(null);

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            description: '',
            price: '',
            name: '',
            quantity: '',
        }
    })
    const { items: provider, status } = useSelector(state => state.provider.providers);


    React.useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const onSubmit = (data) => {
        dispatch(fetchCreateProvider(data));
        handleClose();
    }

    const handleDelete = (value) => {
        if (providerId) {
            dispatch(fetchDeleteProvider({ id: providerId, ...value }))
        }
        handleClose();
    }

    const handleOpen = (providerId) => {
        setOpen(true);
        setProviderId(providerId);
    }

    const handleClose = () => {
        setOpen(false);
        setProviderId(null);
    }
    return (
        <>
            <main className={styles.root}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Поставщики
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="right">Адресс</TableCell>
                                <TableCell align="right">Телефон</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status === "loading" ? (
                                <TableRow>
                                    <TableCell colSpan={4}>Загрузка...</TableCell>
                                </TableRow>
                            ) : status === "error" ? (
                                <TableRow>
                                    <TableCell colSpan={4}>Ошибка при загрузке данных...</TableCell>
                                </TableRow>
                            ) : (
                                provider.map((obj, index) => (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {obj.name}
                                        </TableCell>
                                        <TableCell align="right">{obj.address}</TableCell>
                                        <TableCell align="right">{obj.telephone}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => handleOpen(obj.id)}>Изменить</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button className={styles.homeLink} onClick={handleOpen}>
                    Добавить
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Изменить/Добавить</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.name?.message)}
                                {...register('name', { required: 'Пустое поле' })}
                                label='Название'
                                fullWidth
                            />
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
                                error={Boolean(errors.telephone?.message)}
                                {...register('telephone', { required: 'Пустое поле' })}
                                label='Телефон'
                                fullWidth
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

export default Provider;
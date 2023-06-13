import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCreateProduct, fetchDeleteProduct } from "../../redux/slices/productSlice";
import { fetchProviders } from "../../redux/slices/providerSlice";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { fetchStock } from "../../redux/slices/stockSlice";
import { fetchStockItem } from "../../redux/slices/stockItemSlice";
import { useForm } from 'react-hook-form';

import { MenuItem, Select } from "@mui/material";
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

    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [selectedProvider, setSelectedProvider] = React.useState("");
    const [selectedStock, setSelectedStock] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [productId, setProductId] = React.useState(null);

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            description: '',
            price: '',
            name: '',
            quantity: '',
        }
    });

    const { items: product } = useSelector(state => state.product.products);
    const { items: providers } = useSelector(state => state.provider.providers);
    const { items: categories } = useSelector(state => state.categories.categories);
    const { items: stocks } = useSelector(state => state.stock.stocks);
    const { items: stocksItem } = useSelector(state => state.stockItem.stockItem);

    React.useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchProviders());
        dispatch(fetchStock());
        dispatch(fetchStockItem());
    }, [dispatch]);
    const onSubmit = (data) => {
        const productData = {
            ...data,
            categoryId: selectedCategory,
            providerId: selectedProvider,
            stockId: selectedStock,
        };
        dispatch(fetchCreateProduct(productData));
        handleClose();
    };

    const handleDelete = (value) => {
        if (productId) {
            dispatch(fetchDeleteProduct({ id: productId, ...value }));
        }
        handleClose();
    };

    const handleOpen = (productId) => {
        setOpen(true);
        setProductId(productId);
    };

    const handleClose = () => {
        setOpen(false);
        setProductId(null);
    };

    return (
        <>
            <main className={styles.root}>
                <Typography variant="h4" component="h4" className={styles.title}>
                    Продукты
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Описание</TableCell>
                                <TableCell align="right">Название</TableCell>
                                <TableCell align="right">Цена (шт.)</TableCell>
                                <TableCell align="right">Количество</TableCell>
                                <TableCell align="right">Категория</TableCell>
                                <TableCell align="right">Поставщик</TableCell>
                                <TableCell align="right">Склад</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map((obj, index) => {
                                const category = categories.find((category) => category.id === obj.categoryId);
                                const provider = providers.find((provider) => provider.id === obj.providerId);
                                const stockId = obj.stockItemId;
                                const stock = stocks.find((stock) => stock.id === stockId);

                                const stockName = stock ? stock.name : "";
                                return (
                                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {obj.description}
                                        </TableCell>
                                        <TableCell align="right">{obj.name}</TableCell>
                                        <TableCell align="right">{obj.price + ` руб.`}</TableCell>
                                        <TableCell align="right">{obj.quantity}</TableCell>
                                        <TableCell align="right">{category ? category.name : ""}</TableCell>
                                        <TableCell align="right">{provider ? provider.name : ""}</TableCell>
                                        <TableCell align="right">{obj.stocks[0].name}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => handleOpen(obj.id)}>Изменить</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button className={styles.homeLink} onClick={() => handleOpen(null)}>
                    Добавить продукт
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{productId ? "Изменить продукт" : "Добавить продукт"}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.description?.message)}
                                {...register('description', { required: 'Пустое поле' })}
                                label='Описание продукта'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.name?.message)}
                                {...register('name', { required: 'Пустое поле' })}
                                label='Название продукта'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.price?.message)}
                                {...register('price', { required: 'Пустое поле' })}
                                label='Цена продукта'
                                fullWidth
                            />
                            <TextField
                                variant="standard"
                                className={styles.field}
                                error={Boolean(errors.quantity?.message)}
                                {...register('quantity', { required: 'Пустое поле' })}
                                label='Количество продукта'
                                fullWidth
                            />
                            <Select
                                className={styles.select}
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                label="Категория"
                                fullWidth
                            >
                                <MenuItem value="">Выберите категорию</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Select
                                className={styles.select}
                                value={selectedProvider}
                                onChange={(event) => setSelectedProvider(event.target.value)}
                                label="Поставщик"
                                fullWidth
                            >
                                <MenuItem value="">Выберите поставщика</MenuItem>
                                {providers.map((provider) => (
                                    <MenuItem key={provider.id} value={provider.id}>
                                        {provider.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Select
                                className={styles.select}
                                value={selectedStock}
                                onChange={(event) => setSelectedStock(event.target.value)}
                                label="Склад"
                                fullWidth
                            >
                                <MenuItem value="">Выберите склад</MenuItem>
                                {stocks.map((stock) => (
                                    <MenuItem key={stock.id} value={stock.id}>
                                        {stock.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {productId && (
                            <Button color="error" onClick={() => handleDelete(product.find(obj => obj.id === productId))}>
                                Удалить
                            </Button>
                        )}
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button type='submit' onClick={handleSubmit(onSubmit)}>Сохранить</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    );
}
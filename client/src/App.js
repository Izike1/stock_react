import { Routes, Route } from 'react-router-dom'

import Stock from './pages/Stock/Stock'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Provider from './pages/Provider/Provider';
import Categories from "./pages/Categories/Categories";

import Container from '@mui/material/Container'
import styles from './App.module.css';

function App() {
    return (
        <>
            <Container maxWidth="md">
                <Header />
                <div className={styles.wrapper}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/categories' element={<Categories/>}/>
                        <Route path='/stock' element={<Stock />} />
                        <Route path='/provider' element={<Provider />} />
                    </Routes>
                </div>
            </Container>
        </>
    );
}

export default App;

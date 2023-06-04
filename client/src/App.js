import { Routes, Route } from 'react-router-dom'

import Employee from './pages/Employee/Employee';
import Stock from './pages/Stock/Stock'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Provider from './pages/Provider/Provider';
import Customer from './pages/Customer/Customer';

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
                        <Route path='/stock' element={<Stock />} />
                        <Route path='/employee' element={<Employee />} />
                        <Route path='/provider' element={<Provider />} />
                        <Route path='/customer' element={<Customer />} />
                    </Routes>
                </div>
            </Container>
        </>
    );
}

export default App;

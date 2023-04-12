import { Routes, Route } from 'react-router-dom'

import Staff from './pages/Staff/Staff';
import Stock from './pages/Stock/Stock'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import AddForm from './pages/AddForm/AddForm';

import Container from '@mui/material/Container'
import styles from './App.module.css';

function App() {
    return (
        <>
            <Container maxWidth="md">
                <Header />
                <div className={styles.wrapper}>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/stock' element={<Stock />} />
                        <Route path='/staff' element={<Staff />} />
                        <Route path='/addform' element={<AddForm />} />
                    </Routes>
                </div>
            </Container>
        </>
    );
}

export default App;

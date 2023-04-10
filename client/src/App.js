import { Routes, Route } from 'react-router-dom'

import Other from './pages/Other/Other'
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Container from '@mui/material/Container'
import './App.css';

function App() {
    return (
        <>
            <Container maxWidth="md">
                <Header />
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/other' element={<Other />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;

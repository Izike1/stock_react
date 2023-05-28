import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const { data } = await axios.get('employee/getAll?id=2')
    return data;
    })

const initialState = {
    stock: {
        items: [],
        status: 'loading'
    },
    provider: {
        items: [],
        status: 'loading'
    },
    employee: {
        items: [],
        status: 'loading'
    },
    customer: {
        items: [],
        status: 'loading'
    },

}

const stockSlice = createSlice({
    name: 'slice',
    initialState,
    reducer: {

    },
})

export const stockReducer = stockSlice.reducer
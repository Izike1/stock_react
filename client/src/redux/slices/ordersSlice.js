import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const { data } = await axios.get('order/getAll')
    return data;
});

export const fetchAddOrderSlice = createAsyncThunk('order/fetchAddOrderSlice', async (params) => {
    const { data } = await axios.post('order/create', params)
    return data;
})

export const fetchUpdateOrder = createAsyncThunk('order/fetchUpdateOrder', async (params) => {
    const { id, ...data } = params;
    const { response } = await axios.post(`order/change?id=${id}`, data);
    return response.data;
})

export const fetchDeleteOrder = createAsyncThunk('order/fetchDeleteOrder', async (params) => {
    const { data } = await axios.delete(`order/delete?id=${params.id}`)
    return data;
})

const initialState = {
    data: null,
    orders: {
        items: [],
        status: 'loading'
    }

}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.orders.items = [];
            state.orders.status = 'loading';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders.items = action.payload;
            state.orders.status = 'loaded'
        },
        [fetchOrders.rejected]: (state) => {
            state.orders.items = [];
            state.orders.status = 'error';
        },
        [fetchAddOrderSlice.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAddOrderSlice.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAddOrderSlice.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchUpdateOrder.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUpdateOrder.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUpdateOrder.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
})

export const ordersReducer = ordersSlice.reducer
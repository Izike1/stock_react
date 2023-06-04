import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async () => {
    const { data } = await axios.get('customer/getAll')
    return data;
});

export const fetchCreateCustomer = createAsyncThunk('customer/fetchCreateCustomer', async (params) => {
    const { data } = await axios.post('customer/create', params)
    return data;
})

const initialState = {
    data: null,
    customers: {
        items: [],
        status: 'loading'
    }

}

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCustomer.pending]: (state) => {
            state.customers.items = [];
            state.customers.status = 'loading';
        },
        [fetchCustomer.fulfilled]: (state, action) => {
            state.customers.items = action.payload;
            state.customers.status = 'loaded'
        },
        [fetchCustomer.rejected]: (state) => {
            state.customers.items = [];
            state.customers.status = 'error';
        },
        [fetchCreateCustomer.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchCreateCustomer.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchCreateCustomer.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
})

export const customerReducer = customersSlice.reducer
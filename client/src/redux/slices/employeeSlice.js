import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchEmployee = createAsyncThunk('employees/fetchEmployee', async () => {
    const { data } = await axios.get('employee/getAll')
    return data;
});

export const fetchCreateEmployee = createAsyncThunk('employees/fetchCreateEmployee', async (params) => {
    const { data } = await axios.post('employee/create', params)
    return data;
})

const initialState = {
    data: null,
    employees: {
        items: [],
        status: 'loading'
    }

}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchEmployee.pending]: (state) => {
            state.employees.items = [];
            state.employees.status = 'loading';
        },
        [fetchEmployee.fulfilled]: (state, action) => {
            state.employees.items = action.payload;
            state.employees.status = 'loaded'
        },
        [fetchEmployee.rejected]: (state) => {
            state.employees.items = [];
            state.employees.status = 'error';
        },
        [fetchCreateEmployee.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchCreateEmployee.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchCreateEmployee.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
})

export const employeeReducer = employeesSlice.reducer
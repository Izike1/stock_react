import { configureStore } from "@reduxjs/toolkit";
import { ordersReducer } from "./slices/ordersSlice";
import { employeeReducer } from "./slices/employeeSlice";
import { stocksReduser } from "./slices/stockSlice";
import { customerReducer } from "./slices/customerSlice";

const store = configureStore({
    reducer: {
        order: ordersReducer,
        employee: employeeReducer,
        stock: stocksReduser,
        customer: customerReducer

    }
})

export default store;
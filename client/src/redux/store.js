import { configureStore } from "@reduxjs/toolkit";
import { stockReducer } from "./slices/stockSlice";

const store = configureStore({
    reducer: {
        slice: stockReducer,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import { productReducer} from "./slices/productSlice";
import { stocksReduser } from "./slices/stockSlice";
import { providerReducer } from "./slices/providerSlice";
import { categoriesReducer } from "./slices/categoriesSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        stock: stocksReduser,
        provider: providerReducer,
        categories: categoriesReducer,
    }
})

export default store;
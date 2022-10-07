import { configureStore } from '@reduxjs/toolkit'
import purchasesSlice from './purchases.slice'
import isLoadingSlice from './slices/isLoading.slice'
import newProductsSlice from './slices/newProducts.slice'
import cartSlice from './slices/cart.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        newProducts: newProductsSlice,
        purchases: purchasesSlice,
        cart: cartSlice
    }
})

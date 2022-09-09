import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import productSlice from './slices/productSlice'
import userSlice from './slices/userSlice'

import uiSlice from './slices/uiSlice'

const store = configureStore({
  reducer: { ui: uiSlice, product: productSlice, cart: cartSlice, user: userSlice },
})

export default store

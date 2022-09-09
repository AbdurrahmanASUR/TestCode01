import { createSlice } from '@reduxjs/toolkit'

const findProduct = (list, productId) => {
  const productIndex = list.findIndex(item => item.productId === productId)
  const product = list[productIndex]
  return {
    product,
    productIndex,
  }
}

const initialState = {
  cartList: [],
  totalItems: 0,
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartList = action.payload.cartList
      state.totalItems = action.payload.totalItems
    },
    addProduct(state, action) {
      state.cartList.push(action.payload)
      state.totalItems = state.totalItems + 1
    },
    deleteProduct(state, action) {
      const { id: productId } = action.payload

      state.cartList = state.cartList.filter(product => product.productId !== productId)
      state.totalItems = state.totalItems - 1
    },

    updateProductQuantity(state, action) {
      const { id: productId, quantity } = action.payload
      const { product, productIndex } = findProduct(state.cartList, productId)

      if (product) {
        state.cartList[productIndex].quantity = quantity
      }
    },
    updateProductSize(state, action) {
      const { id: productId, size } = action.payload
      const { product, productIndex } = findProduct(state.cartList, productId)

      if (product) {
        state.cartList[productIndex].size = size
      }
    },
  },
})

export const cartActions = CartSlice.actions

export default CartSlice.reducer

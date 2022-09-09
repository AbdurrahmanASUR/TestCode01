import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  quantity: 1,
  size: 'none',
  comments: [],
}
const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload
    },
    addComment(state, action) {},
    setQuantity(state, action) {
      state.quantity = action.payload
    },
    setSize(state, action) {
      state.size = action.payload
    },
  },
})

export const productActions = ProductSlice.actions

export default ProductSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawerOpen: false,
  searchOpen: false,
  authModalOpen: false,
  authMethod: true,
  notification: {
    open: false,
    message: null,
    type: 'info',
  },
  modalLoadingOpen: false,
}
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDrawer(state) {
      state.drawerOpen = true
    },
    closeDrawer(state) {
      state.drawerOpen = false
    },
    openAuthModal(state) {
      state.authModalOpen = true
    },
    closeAuthModal(state) {
      state.authModalOpen = false
    },
    openNotification(state, action) {
      const notification = state.notification
      const { message, type } = action.payload

      notification.open = true
      notification.message = message
      notification.type = type
    },
    closeNotification(state) {
      const notification = state.notification

      notification.open = false
    },
    openModalLoading(state) {
      state.modalLoadingOpen = true
    },
    closeModalLoading(state) {
      state.modalLoadingOpen = false
    },
    toggleMethod(state) {
      state.authMethod = !state.authMethod
    },
    openSearchDrawer(state) {
      state.searchOpen = true
    },
    closeSearchDrawer(state) {
      state.searchOpen = false
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer

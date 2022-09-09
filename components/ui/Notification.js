import { Snackbar, Alert, Slide } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { uiActions } from '../../store/slices/uiSlice'

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />
}

const Notification = () => {
  const { open, message, type} = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  const closeHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(uiActions.closeNotification())
  }
 

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={closeHandler}
      TransitionComponent={TransitionLeft}
    >
      <Alert severity={type} onClose={closeHandler}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification

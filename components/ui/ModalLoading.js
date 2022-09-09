import { Box, CircularProgress, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/slices/uiSlice'
import { centered } from '../mixins/centered'

const StyledBackdrop = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 9999999,
  ...centered(),
}))

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.gray[1],
  borderRadius: theme.shape.sm,
  ...centered(),
}))

const ModalLoading = () => {
  const dispatch = useDispatch()
  const modalLoadingOpen = useSelector(state => state.ui.modalLoadingOpen)

  const openModalHandler = () => {
    dispatch(uiActions.openModalLoading())
  }
  const closeModalHandler = () => {
    dispatch(uiActions.closeModalLoading())
  }

  return (
    <>
      {modalLoadingOpen && (
        <StyledBackdrop>
          <StyledContainer sx={{ p: 3 }}>
            <CircularProgress />
          </StyledContainer>
        </StyledBackdrop>
      )}
    </>
  )
}

export default ModalLoading

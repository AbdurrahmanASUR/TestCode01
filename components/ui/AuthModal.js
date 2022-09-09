import { Paper, Modal, styled, Typography, Fade, Slide, Divider } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/slices/uiSlice'
import CloseIcon from '@mui/icons-material/Close'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Box } from '@mui/system'
import AuthForm from './AuthForm'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.md,
  borderColor: 'rgba(0,0,0,.2)',
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[5],
}))

const AuthModal = () => {
  const authModalOpen = useSelector(state => state.ui.authModalOpen)
  const method = useSelector(state => state.ui.authMethod)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const modalRef = useRef()

  useEffect(() => {
    if (user) {
      dispatch(uiActions.closeAuthModal())
    }
  }, [user])

  const closeModalHandler = () => {
    dispatch(uiActions.closeAuthModal())
  }

  return (
    <Modal
      open={authModalOpen}
      onClose={closeModalHandler}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        pt: 15,
        px: 1.25,
        '& *': {
          outline: 'none',
        },
      }}
      closeAfterTransition
      ref={modalRef}
    >
      <Fade in={authModalOpen}>
        <div>
          <Slide direction="down" in={authModalOpen} container={modalRef.current}>
            <StyledPaper variant="outlined" sx={{ width: { xs: '100%', sm: 400 }, p: 1.5 }}>
              <CloseIcon onClick={closeModalHandler} sx={{cursor: 'pointer'}}/>
              <Box align="center">
                <PersonAddAltIcon
                  sx={{
                    fontSize: 50,
                    border: theme => `3px solid ${theme.palette.gray[1]}`,
                    color: theme => theme.palette.gray[1],
                    borderRadius: 1000,
                    boxSizing: 'content-box',
                    p: 2,
                    mb: 1,
                  }}
                />
                <Typography variant="h5">{method ? 'Login' : 'Register'}</Typography>
              </Box>
              <Divider
                sx={{
                  borderColor: theme => theme.palette.gray[2],
                  my: 2,
                }}
              />

              <AuthForm />
            </StyledPaper>
          </Slide>
        </div>
      </Fade>
    </Modal>
  )
}

export default AuthModal

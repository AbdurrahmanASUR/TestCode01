import { useState } from 'react'
import BasicButton from '../BasicButton'
import AuthInput from '../AuthInput'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/slices/uiSlice'
import { styled, Typography } from '@mui/material'
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
  set,
  dbRef,
  database,
} from '../../../firebase'
import { userActions } from '../../../store/slices/userSlice'
import { emailValidation } from '../AuthForm'

const StyledMethod = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.text.darkPrimary,
  },
}))

const Register = props => {
  const dispatch = useDispatch()

  const [usernameValue, setUsernameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const usernameChangeHandler = event => {
    setUsernameValue(event.target.value)
  }
  const emailChangeHandler = event => {
    setEmailValue(event.target.value)
  }
  const passwordChangeHandler = event => {
    setPasswordValue(event.target.value)
  }
  const formHandler = e => {
    e.preventDefault()

    const emailValid = !!emailValidation(emailValue)
    const passwordValid = passwordValue.length >= 8
    const errorList = []

    if (!usernameValue) {
      errorList.push('Username')
    }
    if (!emailValue) {
      errorList.push('Email')
    }
    if (!passwordValue) {
      errorList.push('Password')
    }

    if (errorList.length !== 0) {
      const errorMessage =
        errorList.map(error => ' ' + error) + `, field${errorList.length > 1 ? 's' : ''} is required.`

      dispatch(uiActions.openNotification({ message: errorMessage, type: 'error' }))
      return
    }

    if (!emailValid) {
      dispatch(uiActions.openNotification({ message: 'Enter a valid email address.', type: 'error' }))
      return
    }
    if (!passwordValid) {
      dispatch(
        uiActions.openNotification({
          message: 'Password must be at least 8 characters',
          type: 'error',
        })
      )
      return
    }

    dispatch(uiActions.openModalLoading())
    const defaultPhotoURL =
      'https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/default_user_image.png?alt=media&token=8aefcd02-3d45-41d9-b8dc-5c2b665a94da'

    const credential = EmailAuthProvider.credential(emailValue, passwordValue)

    linkWithCredential(auth.currentUser, credential)
      .then(userAuth =>
        updateProfile(userAuth.user, {
          displayName: usernameValue,
          photoURL: defaultPhotoURL,
        })
          .then(() => {
            set(dbRef(database, 'users/' + userAuth.user.uid), {
              displayName: usernameValue,
              photoURL: defaultPhotoURL,
            })
            dispatch(
              userActions.login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: defaultPhotoURL,
              })
            )
            dispatch(uiActions.openNotification({ message: 'Successfully registered!' }))
            dispatch(uiActions.closeAuthModal())
            dispatch(uiActions.closeModalLoading())
          })
          .catch(error => {
            dispatch(uiActions.openNotification({ message: error.message, type: 'error' }))
            dispatch(uiActions.closeModalLoading())
          })
      )
      .catch(error => {
        const simplifiedMessage = error.message.split('/')[1].replaceAll('-', ' ').split(')')[0]
        const finalMessage = simplifiedMessage[0].toUpperCase() + simplifiedMessage.slice(1)
        dispatch(uiActions.openNotification({ message: finalMessage, type: 'error' }))
      })
  }

  return (
    <form onSubmit={formHandler}>
      <AuthInput
        required
        label="Username"
        input={{
          placeholder: 'Ali almerjany',
          type: 'text',
          value: usernameValue,
          onChange: usernameChangeHandler,
        }}
      />
      <AuthInput
        required
        label="Email address"
        input={{
          placeholder: 'Some@gmail.com',
          type: 'email',
          value: emailValue,
          onChange: emailChangeHandler,
        }}
      />
      <AuthInput
        required
        label="Password"
        input={{
          placeholder: 'Hello123',
          type: 'password',
          value: passwordValue,
          onChange: passwordChangeHandler,
        }}
      />
      <Typography mt={1} variant="h6" sx={{ userSelect: 'none' }}>
        already have an account? <StyledMethod onClick={props.onChangeMethod}>Login</StyledMethod>
      </Typography>
      <BasicButton variant="contained" sx={{ mt: 0.5 }} fullWidth endIcon={<KeyboardArrowRightIcon />} type="submit">
        Regsiter
      </BasicButton>
    </form>
  )
}

export default Register

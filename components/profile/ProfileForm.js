import { Box, Grid } from '@mui/material'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileInput from './ProfileInput'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import BadgeIcon from '@mui/icons-material/Badge'
import BasicButton from '../ui/BasicButton'
import { uiActions } from '../../store/slices/uiSlice'
import {
  auth,
  storage,
  storageRef,
  uploadBytes,
  updateProfile,
  getDownloadURL,
  updatePassword,
  signInWithEmailAndPassword,
  set,
  database,
  dbRef,
} from '../../firebase'
import { userActions } from '../../store/slices/userSlice'
import { v4 } from 'uuid'
import ProfilePhoto from './ProfilePhoto'
import { useRouter } from 'next/router'

const ProfileForm = () => {
  const [photoURL, setPhotoURL] = useState('')
  const [usernameValue, setUsernameValue] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  const [uploadPhotoLoading, setUploadPhotoLoading] = useState(false)

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (user !== null) {
      setUsernameValue(user.displayName)
      setPhotoURL(user.photoURL)
    }
  }, [user])

  const usernameChangeHandler = event => {
    setUsernameValue(event.target.value)
  }

  const newPasswordChangeHandler = event => {
    setNewPasswordValue(event.target.value)
  }
  const confirmPasswordChangeHandler = event => {
    setConfirmPasswordValue(event.target.value)
  }

  const submitFormHandler = async event => {
    event.preventDefault()
    const passwordIsValid = newPasswordValue.length >= 8

    let passwordChanged = false
    if (usernameValue === '') {
      dispatch(uiActions.openNotification({ message: "You can't set username to empty.", type: 'error' }))
      return
    }
    if (newPasswordValue || confirmPasswordValue) {
      if (newPasswordValue !== confirmPasswordValue) {
        dispatch(uiActions.openNotification({ message: 'Passwords do not match.', type: 'error' }))
        return
      }
      if (!passwordIsValid) {
        dispatch(
          uiActions.openNotification({
            message: 'Password must be at least 8 characters',
            type: 'error',
          })
        )
        return
      }
      passwordChanged = true
    }
    updateUsername()
    if (passwordChanged) {
      updatePassword(auth.currentUser, newPasswordValue)
    }

    async function updateUsername() {
      dispatch(uiActions.openModalLoading())
      await updateProfile(auth.currentUser, {
        displayName: usernameValue,
        photoURL,
      }).then(() => {
        set(dbRef(database, 'users/' + auth.currentUser.uid), { displayName: usernameValue, photoURL })
        dispatch(
          userActions.login({
            email: user.email,
            uid: user.uid,
            displayName: usernameValue,
            photoURL,
          })
        )
        if (passwordChanged) {
          router.push('/')
          dispatch(uiActions.openNotification({ message: 'Successfully saved!. Password changed!.', type: 'success' }))
        } else {
          dispatch(
            uiActions.openNotification({
              message: 'Successfully saved!',
              type: 'success',
            })
          )
        }
      })
      dispatch(uiActions.closeModalLoading())
    }
  }

  const uploadPhotoHandler = event => {
    const currentImage = event.target.files[0]

    if (currentImage == null) return
    setUploadPhotoLoading(true)

    const imagePathRef = storageRef(
      storage,
      `user-profile-photo/${user.uid}/${currentImage.name + v4()}`
    )
    uploadBytes(imagePathRef, currentImage).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setPhotoURL(url)
        setTimeout(() => {
          setUploadPhotoLoading(false)
        }, 1000)
      })
    })
  }

  return (
    <form onSubmit={submitFormHandler}>
      <Box align="center" my={2}>
        <ProfilePhoto photoURL={photoURL} onUploadPhoto={uploadPhotoHandler} isUploading={uploadPhotoLoading} />
      </Box>
      <Grid container rowSpacing={{ xs: 0, md: 2 }} columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <ProfileInput
            label="Username"
            icon={<BadgeIcon />}
            input={{
              placeholder: 'Ali almerjany',
              type: 'text',
              value: usernameValue,
              onChange: usernameChangeHandler,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileInput
            label="Email address"
            icon={<MailOutlineIcon />}
            input={{
              placeholder: 'Ali almerjany',
              type: 'email',
              value: user?.email,
              disabled: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProfileInput
            label="New password"
            icon={<PasswordIcon />}
            input={{
              placeholder: 'hello1234',
              type: 'password',
              value: newPasswordValue,
              onChange: newPasswordChangeHandler,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileInput
            label="Confirm password"
            icon={<PasswordIcon />}
            input={{
              placeholder: 'hello1234',
              type: 'password',
              value: confirmPasswordValue,
              onChange: confirmPasswordChangeHandler,
            }}
          />
        </Grid>
        <Grid item xs={12} mt={{ xs: 3, md: 1 }}>
          <BasicButton variant="contained" fullWidth type="submit">
            Save
          </BasicButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileForm

import PersonIcon from '@mui/icons-material/Person'
import { ListItemIcon, ListItemText, Menu, MenuItem, styled, Typography } from '@mui/material'
import { useState } from 'react'
import CustomButton from '../../ui/CustomButton'
import { useRouter } from 'next/router'

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import { auth, signOut, signInAnonymously } from '../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../store/slices/userSlice'
import { uiActions } from '../../../store/slices/uiSlice'
import { cartActions } from '../../../store/slices/cartSlice'

export const profileMenuList = [
  { title: 'Orders', path: '/orders', icon: <ShoppingCartCheckoutIcon /> },
  { title: 'Favorite', path: '/favorite', icon: <FavoriteIcon /> },
  { title: 'My Account', path: '/profile', icon: <SettingsIcon /> },
]

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& > .MuiPaper-root': {
    boxShadow: theme.shadows[1],
  },
}))

const ProfileMenu = props => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const openProfileLMenuHandler = event => {
    if (auth.currentUser) {
      if (auth.currentUser.email) {
        setProfileAnchorEl(event.currentTarget)
      } else {
        dispatch(uiActions.openAuthModal())
      }
    }
  }

  const closeProfileMenuHandler = () => {
    setProfileAnchorEl(null)
  }
  const selectProfileMenuHandler = path => {
    router.push(path)
    closeProfileMenuHandler()
  }

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        router.push('/')
        dispatch(userActions.logout())
        dispatch(uiActions.openNotification({ message: 'Successfully logout!', type: 'error' }))
        dispatch(cartActions.setCart({ totalItems: 0, cartList: [] }))
        closeProfileMenuHandler()
        signInAnonymously(auth)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <CustomButton onClick={openProfileLMenuHandler} icon={PersonIcon} />
      <StyledMenu
        id="profile-menu"
        anchorEl={profileAnchorEl}
        open={!!profileAnchorEl}
        onClose={closeProfileMenuHandler}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {profileMenuList.map(item => (
          <MenuItem
            onClick={selectProfileMenuHandler.bind(null, item.path)}
            key={item.path}
            sx={{
              '& *': {
                color: 'text.secondary',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem
          onClick={logoutHandler}
          sx={{
            '& *': {
              color: 'text.secondary',
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>logout</ListItemText>
        </MenuItem>
      </StyledMenu>
    </>
  )
}

export default ProfileMenu

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { auth, signOut, signInAnonymously } from '../../firebase'
import { cartActions } from '../../store/slices/cartSlice'
import { uiActions } from '../../store/slices/uiSlice'
import { userActions } from '../../store/slices/userSlice'
import BasicButton from '../ui/BasicButton'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { currencyList } from '../../constants/currencies'

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import ReactCountryFlag from 'react-country-flag'
const drawerWidth = 300

const profileButtonsStyles = { borderRadius: 100, maxWidth: 100, width: '100%', mt: 2 }

const StyledHeader = styled(Box)(({ theme }) => ({
  '& .MuiBox-root': {
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    overflow: 'hidden',
    backgroundColor: theme.palette.gray[2],
  },
  '& img': {
    width: '100%',
  },
}))

const RightDrawer = () => {
  const drawerOpen = useSelector(state => state.ui.drawerOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector(state => state.user.user)

  const closeDrawerHandler = () => {
    dispatch(uiActions.closeDrawer())
  }
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        router.push('/')
        dispatch(userActions.logout())
        dispatch(uiActions.openNotification({ message: 'Successfully logout!', type: 'error' }))
        dispatch(cartActions.setCart({ totalItems: 0, cartList: [] }))
        signInAnonymously(auth)
        closeDrawerHandler()
      })
      .catch(error => console.log(error))
  }
  const openProfileHandler = () => {
    router.push('/profile')
    closeDrawerHandler()
  }
  const signInHandler = event => {
    dispatch(uiActions.openAuthModal())
  }
  const openOrdersHandler = () => {
    router.push('/orders')
    closeDrawerHandler()
  }
  const openFavoriteHandler = () => {
    router.push('/favorite')
    closeDrawerHandler()
  }

  const selectCurrencyHandler = currency => {
    router.push({
      pathname: router.asPath.split('?')[0],
      query: {
        ...Object.fromEntries(Object.entries(router.query).filter(([key]) => !key.includes('productId'))),
        currency,
      },
    })
  }
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={closeDrawerHandler}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          maxWidth: drawerWidth,
          width: '80%',
        },
      }}
    >
      <StyledHeader align="center" sx={{ my: 4 }}>
        <Box>
          <img
            src={
              (user && user.photoURL) ||
              'https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/default_user_image.png?alt=media&token=8aefcd02-3d45-41d9-b8dc-5c2b665a94da'
            }
            alt="profileUrl"
          />
        </Box>
        {!user && (
          <BasicButton
            variant="outlined"
            size="small"
            sx={{ color: 'text.darkPrimary', ml: 0.5, ...profileButtonsStyles, mb: 2 }}
            onClick={signInHandler}
          >
            Sign in
          </BasicButton>
        )}
        {user && (
          <Typography variant="h6" color="text.darkPrimary" mt={0.5}>
            {user.displayName}
          </Typography>
        )}
        {user && (
          <>
            <BasicButton
              variant="contained"
              size="small"
              color="error"
              sx={{ ...profileButtonsStyles, mr: 0.5 }}
              onClick={logoutHandler}
            >
              Logout
            </BasicButton>
            <BasicButton
              variant="outlined"
              size="small"
              sx={{ color: 'text.darkPrimary', ml: 0.5, ...profileButtonsStyles }}
              onClick={openProfileHandler}
            >
              Profile
            </BasicButton>
            <Divider sx={{ mt: 2, borderColor: theme => theme.palette.gray[2] }} />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={openOrdersHandler}>
                  <ListItemIcon>
                    <ShoppingCartCheckoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders" sx={{ ml: '-15px' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={openFavoriteHandler}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorite" sx={{ ml: '-15px' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
        <Divider sx={{ borderColor: theme => theme.palette.gray[2] }} />
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            color: 'text.secondary',
            '&:before': {
              height: 0,
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CurrencyExchangeIcon sx={{ mr: 2 }} /> Currency
          </AccordionSummary>
          <AccordionDetails
            sx={{
              p: 0,
            }}
          >
            <List>
              {Object.keys(currencyList)?.map((currency, index) => {
                const type = currencyList[currency]

                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton onClick={selectCurrencyHandler.bind(null, type.currencyCode)}>
                      <ReactCountryFlag
                        countryCode={type.countryCode}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                          marginRight: '15px',
                        }}
                        title={type.countryCode}
                      />
                      <Typography color="text.secondary">{type.title}</Typography>
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </StyledHeader>
    </Drawer>
  )
}

export default RightDrawer

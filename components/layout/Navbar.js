import { AppBar, Badge, Box, Container, styled, Toolbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'


import { uiActions } from '../../store/slices/uiSlice'
import { centered } from '../mixins/centered'

import CustomButton from '../ui/CustomButton'
import CurrencyButton from './navbar/CurrencyButton'
import Logo from './navbar/Logo'
import { useRouter } from 'next/router'
import ProfileMenu from './navbar/ProfileMenu'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'inherit',
  borderBottom: `2px solid ${theme.palette.secondary.main}`,
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: navbarHeight,
  p: '10px',
}))

const StyledMenuBox = styled(Box)(({ theme }) => ({
  height: 35,
  width: 35,
  cursor: 'pointer',
  ...centered(),
  '&:hover svg': {
    color: theme.palette.action.hover,
  },
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.text.primary,
  },
}))

const FixedMenuIcon = props => {
  return (
    <StyledMenuBox onClick={props.onClick} sx={props.sx}>
      <MenuIcon color="secondary" fontSize="large" />
    </StyledMenuBox>
  )
}

const navbarHeight = 145

const Navbar = () => {
  const router = useRouter()
  const { totalItems } = useSelector(state => state.cart)
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const openCurrencyLMenuHandler = event => {
    setCurrencyAnchorEl(event.currentTarget)
  }

  const closeCurrencyMenuHandler = () => {
    setCurrencyAnchorEl(null)
  }

  const selectCurrencyHandler = currency => {
    // set currency
    router.push({
      pathname: router.asPath.split('?')[0],
      query: {
        ...Object.fromEntries(Object.entries(router.query).filter(([key]) => !key.includes('productId'))),
        currency,
      },
    })
    closeCurrencyMenuHandler()
  }

  const openDrawerHandler = () => {
    console.log('open drawer')
    dispatch(uiActions.openDrawer())
  }

  const openSearchHandler = async () => {
    dispatch(uiActions.openSearchDrawer())
    
  }

  const openCartHandler = () => {
    router.push({
      pathname: '/cart',
      query: router.query.currency && { currency: router.query.currency },
    })
  }

  return (
    <>
      <StyledAppBar component="nav" position="sticky">
        <Container maxWidth="lg">
          <StyledToolbar>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <StyledBadge badgeContent={totalItems} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <CustomButton icon={ShoppingCartIcon} onClick={openCartHandler} />
              </StyledBadge>
              <CustomButton icon={SearchIcon} onClick={openSearchHandler} />
      

              <CurrencyButton
                onOpenCurrency={openCurrencyLMenuHandler}
                onCloseCurrency={closeCurrencyMenuHandler}
                onSelectCurrency={selectCurrencyHandler}
                anchorEl={currencyAnchorEl}
              />
            </Box>
            <Box sx={{ ...centered(), gap: 1 }}>
              <Logo />
              <FixedMenuIcon onClick={openDrawerHandler} sx={{ display: { xs: 'flex', md: 'none' } }} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <ProfileMenu />
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </>
  )
}

export default Navbar

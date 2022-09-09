import { Box, Container, Grid, Paper, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

import CartProduct from '../components/cart/CartProduct'
import BasicButton from '../components/ui/BasicButton'

import { auth } from '../firebase'
import { uiActions } from '../store/slices/uiSlice'

import { currencyFormatter } from '../utils/currencyFormatter'
import { checkCurrencyQuery } from '../utils/checkCurrencyQuery'
import Head from 'next/head'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderColor: theme.palette.gray[0],
  borderRadius: theme.shape.sm,
}))

const CartPage = () => {
  const { cartList } = useSelector(state => state.cart)
  const router = useRouter()
  const currencyQuery = checkCurrencyQuery(router.query.currency) || 'USD'
  const dispatch = useDispatch()

  const checkoutHandler = () => {
    if (auth.currentUser.email) {
      dispatch(uiActions.openNotification({message: 'This feature is not available!',type: 'warning'}))
    } else {
      dispatch(uiActions.openAuthModal())
    }
  }

  const backToHomeHandler = () => {
    router.push({ pathname: `/`, query: router.query.currency && { currency: router.query.currency } })
  }

  const totalAmount = cartList.reduce((cur, item) => item.price * item.quantity + cur, 0)

  return (
    <>
    <Head>
      <title>Cart - TM CLOSET</title>
    </Head>
      <Container maxWidth="md" sx={{ my: 4 }}>
        {cartList.length !== 0 && (
          <Grid container spacing={3}>
            {cartList.map(product => (
              <Grid item key={product.productId} xs={12}>
                <CartProduct product={product} currency={currencyQuery} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <StyledPaper variant="outlined" sx={{ p: 2, color: 'text.dark' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight="bold">Total Amount:</Typography>
                  <Typography>{currencyFormatter(totalAmount, currencyQuery)}</Typography>
                </Box>
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <BasicButton variant="contained" onClick={checkoutHandler} endIcon={<KeyboardArrowRightIcon />}>
                Proceed to checkout
              </BasicButton>
            </Grid>
          </Grid>
        )}
        {cartList.length === 0 && (
          <Box align="center" mt={15}>
            <HeartBrokenIcon sx={{ fontSize: 100, color: theme => theme.palette.gray[1] }} />
            <Typography color="text.secondary" variant="h6">
              Cart is empty
            </Typography>
            <BasicButton
              variant="contained"
              sx={{ borderRadius: 6, maxWidth: 300, width: '100%', mt: 5 }}
              endIcon={<ArrowForwardIosIcon sx={{ fontSize: '1rem !important' }} />}
              size="large"
              onClick={backToHomeHandler}
            >
              Back to the store
            </BasicButton>
          </Box>
        )}
      </Container>
    </>
  )
}

export default CartPage

import { Divider, IconButton, Paper, styled, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

import { alertMessage } from '../../../constants/text'
import { cartActions } from '../../../store/slices/cartSlice'
import { uiActions } from '../../../store/slices/uiSlice'

import { currencyFormatter } from '../../../utils/currencyFormatter'

import BasicButton from '../../ui/BasicButton'
import InputWrapper from '../../ui/InputWrapper'
import ProductInputs from './ProductInputs'

import { dbRef, set, database, auth, get, remove } from '../../../firebase'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderColor: theme.palette.gray[0],
  borderRadius: theme.shape.xl,
}))

const AddToCartOptions = ({ product }) => {
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false)
  const user = useSelector(state => state.user.user)
  const { quantity, size } = useSelector(state => state.product)

  useEffect(() => {
    if (user && user.uid) {
      dispatch(uiActions.openModalLoading())
      get(dbRef(database, 'users-favorite/' + user.uid + '/' + product.id))
        .then(snapshot => {
          if (snapshot.exists()) {
            setIsFavorite(true)
          } else {
            setIsFavorite(false)
          }
          dispatch(uiActions.closeModalLoading())
        })
        .catch(error => {
          dispatch(uiActions.closeModalLoading())
        })
    }
  }, [user])

  const addToCartHandler = () => {
    if (size === 'none') {
      dispatch(uiActions.openNotification({ message: alertMessage.chooseSize, type: 'error' }))
      return
    }
    const productId = product.id + v4()

    dispatch(uiActions.openModalLoading())

    set(dbRef(database, 'users-cart/' + auth.currentUser.uid + '/' + productId), {
      id: product.id,
      quantity,
      size,
      addedDate: new Date().getTime(),
    })
      .then(() => {
        get(dbRef(database, 'products/' + product.id)).then(snapshot => {
          if (snapshot.exists()) {
            const { imageUrl, price, name, sizes } = snapshot.val()
            dispatch(
              cartActions.addProduct({
                productId,
                id: product.id,
                name,
                imageUrl,
                price,
                quantity,
                size,
                addedDate: new Date().getTime(),
                sizes,
              })
            )
            dispatch(uiActions.openNotification({ message: 'Added to cart', type: 'success' }))
            dispatch(uiActions.closeModalLoading())
          }
        })
      })
      .catch(error => {
        console.log(error)
        dispatch(uiActions.closeModalLoading())
      })
  }

  const toggleFavorite = async () => {
    dispatch(uiActions.openModalLoading())

    if (!isFavorite) {
      await set(dbRef(database, 'users-favorite/' + user.uid + '/' + product.id), {
        addedDate: new Date().getTime(),
      }).then(() => {
        setIsFavorite(state => !state)
        dispatch(uiActions.openNotification({ message: 'Added to favorite', type: 'success' }))
      })
    } else {
      await remove(dbRef(database, 'users-favorite/' + user.uid + '/' + product.id)).then(() => {
        setIsFavorite(state => !state)
        dispatch(uiActions.openNotification({ message: 'Removed from favorite', type: 'error' }))
      })
    }
    dispatch(uiActions.closeModalLoading())
  }
  return (
    <StyledPaper variant="outlined" sx={{ p: 2 }}>
      <ProductInputs sizes={product.sizes} />
      <Divider sx={{ borderBottomWidth: 3, mt: 3 }} />
      <InputWrapper label="Price" sx={{ my: 2 }}>
        <Typography variant="h6" color="text.darkPrimary">
          {currencyFormatter(product.price * quantity, product.currency)}
        </Typography>
      </InputWrapper>
      <Box sx={{ display: 'flex' }}>
        <BasicButton variant="contained" fullWidth onClick={addToCartHandler} sx={{ height: 35 }}>
          Add
        </BasicButton>
        {user && (
          <Box sx={{ ml: 1, '& svg': { cursor: 'pointer' }, width: 35, height: 35 }} onClick={toggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon
                fontSize="large"
                sx={{
                  color: '#E2384D',
                }}
              />
            ) : (
              <FavoriteBorderIcon
                fontSize="large"
                sx={{
                  color: theme => theme.palette.text.primary,
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </StyledPaper>
  )
}

export default AddToCartOptions

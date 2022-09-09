import { Box, Typography } from '@mui/material'
import CustomPaper from '../../ui/CustomPaper'

import { centered } from '../../mixins/centered'
import { useRouter } from 'next/router'
import BasicButton from '../../ui/BasicButton'
import CustomRemoveIcon from '../../ui/CustomRemoveIcon'

import { get, set, dbRef, database, remove } from '../../../firebase'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from '../../../store/slices/uiSlice'
import { cartActions } from '../../../store/slices/cartSlice'
import { v4 } from 'uuid'
import { useContext } from 'react'
import { FavoriteContext } from '../../../pages/favorite'

const FavoriteItem = ({ product }) => {
  const user = useSelector(state => state.user.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const { setFavoriteProducts } = useContext(FavoriteContext)

  const removeFavoriteHandler = () => {
    dispatch(uiActions.openModalLoading())
    remove(dbRef(database, 'users-favorite/' + user.uid + '/' + product.productId)).then(() => {
      dispatch(uiActions.openNotification({ message: 'Removed from favorite', type: 'error' }))

      dispatch(uiActions.closeModalLoading())
      setFavoriteProducts(old => {
        return old.filter(favorite => favorite.productId !== product.productId)
      })
    })
  }

  const openProductHandler = () => {
    router.push({
      pathname: `/${product.productId}`,
      query: router.query.currency && { currency: router.query.currency },
    })
  }
  const addToCartHandler = () => {
    const productId = product.productId + v4()

    dispatch(uiActions.openModalLoading())
    set(dbRef(database, 'users-cart/' + user.uid + '/' + productId), {
      id: product.productId,
      quantity: 1,
      size: 'xs',
      addedDate: new Date().getTime(),
    })
      .then(async () => {
        get(dbRef(database, 'products/' + product.productId)).then(snapshot => {
          if (snapshot.exists()) {
            const { imageUrl, price, name, sizes } = snapshot.val()
            dispatch(
              cartActions.addProduct({
                productId,
                id: product.productId,
                quantity: 1,
                size: 'xs',
                addedDate: new Date().getTime(),
                name,
                imageUrl,
                price,
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

  return (
    <CustomPaper sx={{ position: 'relative' }}>
      <CustomRemoveIcon onClick={removeFavoriteHandler} top={16} right={16} />
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box
          sx={{
            width: 75,
            height: 75,
            borderRadius: 1,
            overflow: 'hidden',
            cursor: 'pointer',
            ...centered(),
            flexShrink: 0,
          }}
          onClick={openProductHandler}
        >
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        </Box>
        <Typography sx={{ ml: 1, fontSize: 20 }} color="text.secondary">
          {product.name}
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <BasicButton variant="contained" size="small" sx={{ borderRadius: 1000, px: 3 }} onClick={addToCartHandler}>
            Add to cart
          </BasicButton>
        </Box>
      </Box>
    </CustomPaper>
  )
}

export default FavoriteItem

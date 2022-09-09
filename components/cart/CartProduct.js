import { Box, Paper, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import InputWrapper from '../ui/InputWrapper'
import { currencyFormatter } from '../../utils/currencyFormatter'

import NumberInput from '../ui/inputs/NumberInput'
import SelectInput from '../ui/inputs/SelectInput'
import { checkCurrencyQuery } from '../../utils/checkCurrencyQuery'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'

import { uiActions } from '../../store/slices/uiSlice'
import { alertMessage } from '../../constants/text'
import CustomRemoveIcon from '../ui/CustomRemoveIcon'

import { remove, dbRef, database, auth, update } from '../../firebase'
import CustomPaper from '../ui/CustomPaper'

const CartProduct = ({ currency, product }) => {
  const { quantity } = product
  const dispatch = useDispatch()
  const router = useRouter()

  const numberValidation = value => {
    if (value > 100) {
      dispatch(
        uiActions.openNotification({
          message: alertMessage.max100,
          type: 'error',
        })
      )
      updateProductDatabase({ quantity: 100 })

      dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: 100 }))
    } else if (value < 1) {
      dispatch(
        uiActions.openNotification({
          message: alertMessage.min1,
          type: 'error',
        })
      )
      updateProductDatabase({ quantity: 1 })

      dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: 1 }))
    }
  }

  const incrementHandler = () => {
    updateProductDatabase({ quantity: +quantity + 1 })

    dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: +quantity + 1 }))
    if (quantity >= 100) {
      updateProductDatabase({ quantity: 100 })

      dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: 100 }))
      dispatch(
        uiActions.openNotification({
          message: alertMessage.max100,
          type: 'warning',
        })
      )
    }
  }
  const decrementHandler = () => {
    updateProductDatabase({ quantity: +quantity - 1 })
    dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: +quantity - 1 }))
    if (quantity <= 1) {
      updateProductDatabase({ quantity: 1 })

      dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: 1 }))
      dispatch(
        uiActions.openNotification({
          message: alertMessage.min1,
          type: 'warning',
        })
      )
    }
  }
  const quantityChangeHandler = event => {
    const currentQuantity = event.target.value

    updateProductDatabase({ quantity: currentQuantity })
    dispatch(cartActions.updateProductQuantity({ id: product.productId, quantity: currentQuantity }))
    numberValidation(currentQuantity)
  }

  const selectChangeHandler = event => {
    const currentSize = event.target.value
    updateProductDatabase({ size: currentSize }).then(() => {
      dispatch(cartActions.updateProductSize({ id: product.productId, size: currentSize }))
    })
  }

  const openProductHandler = () => {
    router.push({ pathname: `/${product.id}`, query: router.query.currency && { currency: router.query.currency } })
  }

  const deleteProductHandler = () => {
    dispatch(uiActions.openModalLoading())
    remove(dbRef(database, 'users-cart/' + auth.currentUser.uid + '/' + product.productId)).then(() => {
      dispatch(cartActions.deleteProduct({ id: product.productId }))
      dispatch(uiActions.openNotification({ message: 'Product removed!', type: 'success' }))
      dispatch(uiActions.closeModalLoading())
    })
  }

  function updateProductDatabase(dataObj) {
    return update(dbRef(database, 'users-cart/' + auth.currentUser.uid + '/' + product.productId), dataObj)
  }

  return (
    <CustomPaper sx={{ position: 'relative' }}>
      <CustomRemoveIcon onClick={deleteProductHandler} top={16} right={16} />
      <Box sx={{ display: 'flex' }} mb={2}>
        <Box
          mr={1}
          onClick={openProductHandler}
          sx={{ height: 75, borderRadius: 1, overflow: 'hidden', cursor: 'pointer' }}
        >
          <img src={product.imageUrl} style={{ height: '100%' }} alt={product.name} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            color="text.primary"
            onClick={openProductHandler}
            sx={{
              cursor: 'pointer',
              width: 'fit-content',
              '&:hover': {
                color: 'text.darkPrimary',
              },
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.darkPrimary">
            {currencyFormatter(product.price, currency)}
          </Typography>
          <Typography variant="h6" color="text.light">
            Total: {currencyFormatter(product.price * product.quantity, currency)}
          </Typography>
        </Box>
      </Box>
      <>
        <InputWrapper
          label="Quantity"
          component={
            <NumberInput
              value={product.quantity}
              onIncrement={incrementHandler}
              onDecrement={decrementHandler}
              onChange={quantityChangeHandler}
            />
          }
          sx={{ mb: 3 }}
        />
        <InputWrapper
          label="Sizes"
          component={
            <SelectInput onSelect={selectChangeHandler} value={product.size} list={product.sizes} noInitial="true" />
          }
        />
      </>
    </CustomPaper>
  )
}

export default CartProduct

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { productActions } from '../../../store/slices/productSlice'
import { uiActions } from '../../../store/slices/uiSlice'
import { alertMessage } from '../../../constants/text'

import InputWrapper from '../../ui/InputWrapper'
import SelectInput from '../../ui/inputs/SelectInput'
import NumberInput from '../../ui/inputs/NumberInput'

const ProductInputs = props => {
  const { quantity } = useSelector(state => state.product)
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState(0)

  useEffect(() => {
    dispatch(productActions.setQuantity(1))
    dispatch(productActions.setSize('none'))
  }, [])

  const numberValueValidation = value => {
    if (value > 100) {
      dispatch(
        uiActions.openNotification({
          message: alertMessage.max100,
          type: 'error',
        })
      )
      dispatch(productActions.setQuantity(100))
    } else if (value < 1) {
      dispatch(
        uiActions.openNotification({
          message: alertMessage.min1,
          type: 'error',
        })
      )
      dispatch(productActions.setQuantity(1))
    }
  }

  const selectChangeHandler = event => {
    setSelectedValue(event.target.value)
    const selectedSize = props.sizes.find(size => size.size === event.target.value)
    if (selectedSize) {
      dispatch(productActions.setSize(selectedSize.size))
    } else {
      dispatch(productActions.setSize('none'))
    }
  }

  // number functions
  const quantityChangeHandler = event => {
    const currentValue = event.target.value

    dispatch(productActions.setQuantity(currentValue))
    numberValueValidation(currentValue)
  }

  const incrementHandler = () => {
    dispatch(productActions.setQuantity(+quantity + 1))
    if (quantity >= 100) {
      dispatch(productActions.setQuantity(100))
      dispatch(
        uiActions.openNotification({
          message: alertMessage.max100,
          type: 'warning',
        })
      )
    }
  }
  const decrementHandler = () => {
    dispatch(productActions.setQuantity(+quantity - 1))
    if (quantity <= 1) {
      dispatch(productActions.setQuantity(1))
      dispatch(
        uiActions.openNotification({
          message: alertMessage.min1,
          type: 'warning',
        })
      )
    }
  }
  // number functions

  return (
    <>
      <InputWrapper
        label="Quantity"
        component={
          <NumberInput
            value={quantity}
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
          <SelectInput onSelect={selectChangeHandler} value={selectedValue} list={props.sizes} />
        }
      />
    </>
  )
}

export default ProductInputs

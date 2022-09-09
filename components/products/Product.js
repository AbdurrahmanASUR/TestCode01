import { Card, CardActions, Typography, styled, Box, CardMedia, CardContent, CardActionArea } from '@mui/material'
import { useRouter } from 'next/router'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/slices/cartSlice'
import { uiActions } from '../../store/slices/uiSlice'
import { v4 } from 'uuid'
import { set, dbRef, database, auth, get } from '../../firebase'

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: 0,
  boxShadow: theme.shadows[0],
  '& h6': {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shortest,
    }),
  },
  '&:hover': {
    boxShadow: theme.shadows[8],
    '& h6': {
      color: theme.palette.text.primary,
    },
  },
}))

const StyledAddToCartButton = styled(Box)(({ theme }) => ({
  height: 60,
  width: 61,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: '1px solid',
  cursor: 'pointer',
  transition: theme.transitions.create(['background'], {
    duration: theme.transitions.duration.short,
  }),
  '& svg': {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    }),
  },
  '&:hover': {
    background: theme.palette.secondary.main,
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}))

const Product = props => {
  const dispatch = useDispatch()
  const router = useRouter()

  const addProductHandler = () => {
    const productId = props.id + v4()

    dispatch(uiActions.openModalLoading())
    set(dbRef(database, 'users-cart/' + auth.currentUser.uid + '/' + productId), {
      id: props.id,
      quantity: 1,
      size: 'xs',
      addedDate: new Date().getTime(),
    })
      .then(async () => {
        get(dbRef(database, 'products/' + props.id)).then(snapshot => {
          if (snapshot.exists()) {
            const { imageUrl, price, name, sizes } = snapshot.val()
            dispatch(
              cartActions.addProduct({
                productId,
                id: props.id,
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
  const openProductHandler = () => {
    router.push({
      pathname: `/${props.id}`,
      query: router.query.currency && { currency: router.query.currency },
    })
  }
  return (
    <StyledCard>
      <CardActionArea onClick={openProductHandler}>
        <CardMedia component="img" image={props.imageUrl} alt={props.name} sx={{ aspectRatio: '1/1.25' }} />
        <CardContent sx={{ borderBottom: '1px solid', py: 1 }}>
          <Typography color="text.secondary" variant="h6">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ p: 0, pl: 2 }}>
        <Typography sx={{ flexGrow: 1 }}>{props.formattedPrice}</Typography>
        <StyledAddToCartButton onClick={addProductHandler}>
          <AddShoppingCartIcon />
        </StyledAddToCartButton>
      </CardActions>
    </StyledCard>
  )
}

export default Product

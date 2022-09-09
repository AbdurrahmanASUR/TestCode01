import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Box, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { checkCurrencyQuery } from '../../utils/checkCurrencyQuery'
import { centered } from '../mixins/centered'
import { currencyFormatter } from '../../utils/currencyFormatter'

const StyledImageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 100,
  width: '100%',
  aspectRatio: '1/1',
  minWidth: 50,
  overflow: 'hidden',
  ...centered(),
  borderRadius: theme.shape.md,
}))
const SearchProduct = ({ product,onCloseSearch }) => {
  const router = useRouter()
  const currencyQuery = checkCurrencyQuery(router.query.currency) || 'USD'
  const openProductHandler = () => {
    router.push({ pathname: `/${product.id}`, query: router.query.currency && { currency: router.query.currency } })
    onCloseSearch()
  }
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ p: 1, py: 0.5 }} onClick={openProductHandler}>
        <StyledImageContainer sx={{ mr: 1 }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        </StyledImageContainer>
        <Box
          sx={{
            flexGrow: 1,
          }}
          align="center"
        >
          <Typography color="text.secondary" sx={{ fontSize: '1.25rem' }}>
            {product.name}
          </Typography>
          <Typography color="text.darkPrimary" sx={{ fontSize: '1.25rem' }}>
            {currencyFormatter(product.price, currencyQuery)}
          </Typography>
        </Box>
      </ListItemButton>
    </ListItem>
  )
}

export default SearchProduct

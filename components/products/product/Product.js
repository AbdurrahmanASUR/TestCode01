import { Grid, Typography } from '@mui/material'

import AddToCartOptions from './AddToCartOptions'
import ProductCarousel from './ProductCarousel'

import { currencyFormatter } from '../../../utils/currencyFormatter'

const Product = ({ product }) => {
  return (
    <Grid container spacing={2}>
      <ProductCarousel product={product} />
      <Grid item xs={12} md={7}>
        <Typography variant="h5" mb={1}>
          {product.name}
        </Typography>
        <Typography variant="h5" color="text.primary" mb={3}>
          {currencyFormatter(product.price,product.currency)}
        </Typography>
        <AddToCartOptions product={product} />
      </Grid>
    </Grid>
  )
}

export default Product

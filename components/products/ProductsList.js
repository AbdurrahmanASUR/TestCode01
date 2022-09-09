import { Grid } from '@mui/material'

import Product from './Product'

const ProductsList = props => {
  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {props.products.map(product => (
          <Grid item key={product.id} xs={6} sm={6} md={4} lg={3}>
            <Product {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProductsList

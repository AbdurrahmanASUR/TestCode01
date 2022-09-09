import { Grid } from '@mui/material'
import FavoriteItem from './FavoriteItem'

const FavoriteList = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item xs={12} key={product.addedDate}>
          <FavoriteItem product={product}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default FavoriteList

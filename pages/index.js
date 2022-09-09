import { Box, Container, Divider } from '@mui/material'

import ProductsList from '../components/products/ProductsList'
import CustomPagination from '../components/pages/Home/CustomPagination'
import SortingButton from '../components/pages/Home/SortingButton'

import { currencyFormatter } from '../utils/currencyFormatter'
import { checkCurrencyQuery } from '../utils/checkCurrencyQuery'
import { getPage } from './api/get-page'
import Feature from '../components/pages/Home/Feature'

const HomePage = ({ page }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: { xs: 2, sm: 3, md: 4 }, display: 'flex', alignItems: 'center' }}>
        <SortingButton />
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <ProductsList products={page.items} />
      <CustomPagination page={page} />
      <Feature />
    </Container>
  )
}

export async function getServerSideProps({ query }) {
  const pageQuery = +(query.page || 1)
  const sortQuery = query.sort || 'newest'
  const currencyQuery = checkCurrencyQuery(query.currency) || 'USD'

  const data = await getPage(pageQuery, sortQuery)

  // format price by currency
  data.page.items = data.page.items.map(item => ({
    ...item,
    formattedPrice: currencyFormatter(item.price, currencyQuery),
  }))

  if (!data) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      page: data.page,
    },
  }
}

export default HomePage

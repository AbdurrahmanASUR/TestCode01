import { Box, Container, Divider } from '@mui/material'
import Head from 'next/head'

import ProductsList from '../components/products/ProductsList'
import CustomPagination from '../components/pages/Home/CustomPagination'
import SortingButton from '../components/pages/Home/SortingButton'

import { currencyFormatter } from '../utils/currencyFormatter'
import { checkCurrencyQuery } from '../utils/checkCurrencyQuery'
import { getPage } from './api/get-page'
import Feature from '../components/pages/Home/Feature'

const HomePage = ({ page }) => {
  let domain
  let url
  if (typeof window !== 'undefined') {
    domain = window.location.hostname
    url = window.location.href.split('?')[0]
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A boutique by specialists in wedding and evening dresses according to special standards, we care about the smallest details and offer you our products with the best specifications and the most beautiful models that highlight your unique looks"
        />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={'TM CLOSET'} />
        <meta
          property="og:description"
          content="A boutique by specialists in wedding and evening dresses according to special standards, we care about the smallest details and offer you our products with the best specifications and the most beautiful models that highlight your unique looks"
        />
        <meta
          property="og:image"
          content={
            'https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/tm1closet-icon.jpg?alt=media'
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={'TM CLOSET'} />
        <meta
          name="twitter:description"
          content="A boutique by specialists in wedding and evening dresses according to special standards, we care about the smallest details and offer you our products with the best specifications and the most beautiful models that highlight your unique looks"
        />
        <meta
          name="twitter:image"
          content={
            'https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/tm1closet-icon.jpg?alt=media'
          }
        />
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: { xs: 2, sm: 3, md: 4 }, display: 'flex', alignItems: 'center' }}>


          <SortingButton />
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <ProductsList products={page.items} />
        <CustomPagination page={page} />
        <Feature />
      </Container>
    </>
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

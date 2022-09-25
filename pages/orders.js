import { Container, Typography } from '@mui/material'
import Head from 'next/head'

// /orders

const ordersPage = () => {
  return (
    <>
      <Head>
        <title>Orders - TM CLOSET</title>
      </Head>
      <Container maxWidth="lg" align="center" sx={{ my: 20 }}>
        <Typography variant="h5">Orders</Typography>
      </Container>
    </>
  )
}

export default ordersPage

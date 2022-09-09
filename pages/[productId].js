import { Box, Container } from '@mui/material'
import { useRouter } from 'next/router'

import Head from 'next/head'

import Product from '../components/products/product/Product'
import HeadShareCardMarkup from '../components/HeadShareCardMarkup'

import { getProducts } from './api/get-products'
import { checkCurrencyQuery } from '../utils/checkCurrencyQuery'
import Comments from '../components/pages/Product/Comments/Comments'
import { sortProductsList } from '../utils/sortProductsList'
import { auth } from '../firebase'

const ProductPage = ({ product }) => {
  const router = useRouter()
  const currencyQuery = checkCurrencyQuery(router.query.currency) || 'USD'

  product.currency = currencyQuery

  const title = `${product.name} - TM CLOSET`

  return (
    <>
      <Head>
        <title>{title}</title>
        <HeadShareCardMarkup
          title={title}
          image={product.imageUrl}
          description="A boutique by specialists in wedding and evening dresses according to special standards, we care about the smallest details and offer you our products with the best specifications and the most beautiful models that highlight your unique looks"
        />
      </Head>
      <Box my={4}>
        <Box bgcolor="background.gray" sx={{ py: 2 }}>
          <Container maxWidth="lg">
            <Product product={product} />
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Comments productId={product.id} comments={product.comments} />
        </Container>
      </Box>
    </>
  )
}

export async function getStaticPaths() {
  const products = await getProducts()

  return {
    fallback: false,
    paths: products.map(product => ({ params: { productId: product.id } })),
  }
}

export async function getStaticProps(context) {
  const productId = context.params.productId

  const productRes = await fetch(
    `https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`
  )
  const product = await productRes.json()

  const usersRes = await fetch('https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/users.json')
  const users = await usersRes.json()

  const arrayOfComments = Object.keys(product.comments).map(commentKey => ({
    ...product.comments[commentKey],
    commentId: commentKey,
  }))
  const arrayOfUsers = Object.keys(users).map(userKey => ({ ...users[userKey], userUid: userKey }))

  const transformedComments = arrayOfComments.map(comment => {
    const { photoURL, displayName } = arrayOfUsers.find(user => user.userUid === comment.userUid)
    return { ...comment, photoURL, displayName }
  })
  product.comments = sortProductsList(transformedComments, 'newest')

  return {
    props: { product: { ...product, id: productId, isFavorite: false } },
    revalidate: 1,
  }
}

export default ProductPage

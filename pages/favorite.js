import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FavoriteList from '../components/pages/Favorite/FavoriteList'
import BasicButton from '../components/ui/BasicButton'

import { get, database, dbRef } from '../firebase'

import { sortProductsList } from '../utils/sortProductsList'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useRouter } from 'next/router'
import Head from 'next/head'

export const FavoriteContext = React.createContext()
const FavoritePage = ({ products }) => {
  const user = useSelector(state => state.user.user)
  const router = useRouter()
  const [favoriteProducts, setFavoriteProducts] = useState([])

  useEffect(() => {
    if (user && user.uid) {
      get(dbRef(database, 'users-favorite/' + user.uid)).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const favoriteProducts = Object.keys(data).map(productId => ({ productId, ...data[productId] }))
          const transformedFavorites = favoriteProducts.map(favorite => {
            const { imageUrl, name } = products.find(product => product.id === favorite.productId)
            return { imageUrl, name, ...favorite }
          })
          const newestToTopFavorites = sortProductsList(transformedFavorites, 'newest')
          setFavoriteProducts(newestToTopFavorites)
        }
      })
    }
  }, [user])

  const backToHomeHandler = () => {
    router.push({ pathname: `/`, query: router.query.currency && { currency: router.query.currency } })
  }

  const value = {
    setFavoriteProducts,
  }

  return (
    <>
      <Head>
        <title>Favorite - TM CLOSET</title>
      </Head>
      <FavoriteContext.Provider value={value}>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          {favoriteProducts.length !== 0 && <FavoriteList products={favoriteProducts} />}
          {favoriteProducts.length === 0 && (
            <Box align="center" mt={15}>
              <ShoppingCartCheckoutIcon sx={{ fontSize: 100, color: theme => theme.palette.gray[1] }} />
              <Typography color="text.secondary" variant="h6">
                No favorite products
              </Typography>
              <BasicButton
                variant="contained"
                sx={{ borderRadius: 6, maxWidth: 300, width: '100%', mt: 5 }}
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: '1rem !important' }} />}
                size="large"
                onClick={backToHomeHandler}
              >
                Back to the store
              </BasicButton>
            </Box>
          )}
        </Container>
      </FavoriteContext.Provider>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/products.json')
  const data = await response.json()

  const products = Object.keys(data).map(key => ({ imageUrl: data[key].imageUrl, name: data[key].name, id: key }))
  return {
    props: {
      products,
    },
    revalidate: 1,
  }
}

export default FavoritePage

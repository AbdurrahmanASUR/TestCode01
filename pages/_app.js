import NextNProgress from 'nextjs-progressbar'

import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'

import Head from 'next/head'

import '../styles/styles.css'

import theme from '../components/defaultTheme'
import Layout from '../components/layout/Layout'
import store from '../store'
import HeadShareCardMarkup from '../components/HeadShareCardMarkup'

const protectedRoutes = ['/profile', '/favorite', '/orders']

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <link
            rel="icon"
            href="https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/tm1closet-icon.jpg?alt=media"
          />
          <title>TM CLOSET</title>
        </Head>
        <Layout>
          <NextNProgress color={theme.palette.secondary.main} />
          {protectedRoutes.includes(router.pathname) ? (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp

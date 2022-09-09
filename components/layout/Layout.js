import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { auth, database, dbRef, signInAnonymously, get } from '../../firebase'
import { cartActions } from '../../store/slices/cartSlice'
import { userActions } from '../../store/slices/userSlice'
import AuthModal from '../ui/AuthModal'
import ModalLoading from '../ui/ModalLoading'
import Notification from '../ui/Notification'
import Footer from './Footer/Footer'
import Navbar from './Navbar'
import RightDrawer from './RightDrawer'

import { getProducts } from '../../pages/api/get-products'
import { uiActions } from '../../store/slices/uiSlice'
import SearchLeftDrawer from './SearchLeftDrawer'
import { useRouter } from 'next/router'

const Layout = props => {
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.cart.cartList)
  const user = useSelector(state => state.user.user)
  const router = useRouter()

  const isInCartPage = router.pathname === '/cart' || '/favorite'

  const setCart = async snapshot => {
    const cart = snapshot.val()
    const arrayCart = Object.keys(cart).map(productId => ({ ...cart[productId], productId }))

    const initialProducts = await getProducts()
    const transformedCart = arrayCart.map(cartProduct => {
      const { imageUrl, price, name, sizes } = initialProducts.find(
        initialProduct => initialProduct.id === cartProduct.id
      )
      const editedProduct = { ...cartProduct, imageUrl, price, name, sizes }
      return editedProduct
    })
    dispatch(cartActions.setCart({ totalItems: arrayCart.length, cartList: transformedCart }))
    if (isInCartPage) {
      dispatch(uiActions.closeModalLoading())
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('7m3ERzWVgsT2kl6sphySQ6q')) {
      localStorage.setItem('7m3ERzWVgsT2kl6sphySQ6q', v4())
      signInAnonymously(auth)
    }
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (isInCartPage) {
          dispatch(uiActions.openModalLoading())
        }

        get(dbRef(database, 'users-cart/' + user.uid)).then(snapshot => {
          if (snapshot.exists()) {
            setCart(snapshot)
          } else {
            if (isInCartPage) {
              dispatch(uiActions.closeModalLoading())
            }
          }
        })

        if (user.email) {
          dispatch(
            userActions.login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          )
        } else {
          dispatch(userActions.logout())
        }
      }
    })
  }, [auth])

  return (
    <>
      <ModalLoading />
      <AuthModal />
      <Notification />
      <Navbar />
      <SearchLeftDrawer />
      <RightDrawer />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout

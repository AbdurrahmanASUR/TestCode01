import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from '../firebase'

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const user = useSelector(state => state.user.user)
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])
  return <>{auth.currentUser?.email ? children : null}</>
}

export default ProtectedRoute

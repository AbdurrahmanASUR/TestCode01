import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { centered } from '../../mixins/centered'

const Logo = () => {
  const router = useRouter()
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        cursor: 'pointer',
        ...centered(),
        position: { xs: 'static', md: 'absolute' },
        right: {md: '50%'},
        translate: {md: '50%'}
      }}
      onClick={() => {
        router.push('/')
      }}
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/tm1closet.jpg?alt=media"
        style={{ height: '100%' }}
        alt="tm closet"
      />
    </Box>
  )
}

export default Logo

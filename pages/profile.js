import { Container, Paper } from '@mui/material'
import Head from 'next/head'

import ProfileForm from '../components/profile/ProfileForm'

const profilePage = () => {
  return (
    <>
    <Head>
      <title>Profile - TM CLOSET</title>
    </Head>
      <Container maxWidth="lg" sx={{ my: 3 }}>
        <Paper variant="outlined" sx={{ borderColor: theme => theme.palette.gray[0], p: 1.5 }}>
          <ProfileForm />
        </Paper>
      </Container>
    </>
  )
}

export default profilePage

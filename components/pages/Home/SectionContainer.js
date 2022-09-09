import { Container, Typography } from '@mui/material'

const SectionContainer = props => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography align="center" variant="h5" color="text.primary" mb={3}>
        {props.label}
      </Typography>
      {props.children}
    </Container>
  )
}

export default SectionContainer

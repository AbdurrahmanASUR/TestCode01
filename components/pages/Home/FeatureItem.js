import { Box, styled, Typography } from '@mui/material'
import { centered } from '../../mixins/centered'

const StyledIconContainer = styled(Box)(({ theme }) => ({
  height: 100,
  width: 100,
  ...centered(),
  borderRadius: 1000,
  background: theme.palette.secondary.main,
  '& svg': {
    fontSize: 50,
    color: theme.palette.background.default,
  },
}))

const FeatureItem = props => {
  return (
    <Box align="center">
      <StyledIconContainer>{props.icon}</StyledIconContainer>
      <Typography color="text.dark" variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
        {props.title}
      </Typography>
      <Typography color="text.secondary">{props.subtitle}</Typography>
    </Box>
  )
}

export default FeatureItem

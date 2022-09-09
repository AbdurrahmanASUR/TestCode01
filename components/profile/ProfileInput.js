import { Box, InputBase, styled, Typography } from '@mui/material'

import { centered } from '../mixins/centered'

const StyledInput = styled(InputBase)(({ theme, type, disabled }) => ({
  flexGrow: 1,
  paddingLeft: 15,
  color: theme.palette.text.secondary,

  ...(disabled && { backgroundColor: theme.palette.gray[0] }),
  '& input': {
    ...(type === 'number' && {
      '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&[type=number]': {
        MozAppearance: 'textfield',
      },
    }),
  },
}))
const StyledInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.gray[1]}`,
}))

const StyledIconContainer = styled(Box)(({ theme }) => ({
  ...centered(),
  width: 40,
  backgroundColor: theme.palette.gray[1],
  '& svg': {
    fontSize: 18,
  },
}))

const ProfileInput = props => {
  return (
    <Box mt={1} sx={{ color: 'text.secondary' }}>
      <Typography mb={1}>{props.label}</Typography>
      <StyledInputContainer>
        <StyledIconContainer>{props.icon}</StyledIconContainer>
        <StyledInput {...props.input} />
      </StyledInputContainer>
    </Box>
  )
}

export default ProfileInput

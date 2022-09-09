import { useTheme } from '@emotion/react'
import { Box, InputBase, styled, Typography } from '@mui/material'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PasswordIcon from '@mui/icons-material/Password'
import BadgeIcon from '@mui/icons-material/Badge';
import { centered } from '../mixins/centered'

const StyledInput = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: 15,
  color: theme.palette.text.secondary,
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

const AuthInput = props => {
  const theme = useTheme()
  return (
    <Box mt={1}>
      <Typography mb={1}>
        {props.label} {props.required && <span style={{ color: theme.palette.error.main }}>*</span>}
      </Typography>
      <StyledInputContainer>
        <StyledIconContainer>
          {props.input.type === 'password' && <PasswordIcon />}
          {props.input.type === 'email' && <MailOutlineIcon />}
          {props.input.type === 'text' && <BadgeIcon />}
        </StyledIconContainer>
        <StyledInput {...props.input} />
      </StyledInputContainer>
    </Box>
  )
}

export default AuthInput

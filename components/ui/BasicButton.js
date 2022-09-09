import { Button, styled } from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const BasicButton = props => {
  return (
    <StyledButton {...props} color={props.color || 'secondary'} disableElevation>
      {props.children}
    </StyledButton>
  )
}

export default BasicButton

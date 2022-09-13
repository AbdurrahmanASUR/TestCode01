import { Box, styled } from '@mui/material'

import { buttonMixins } from '../mixins/buttonMixins'

const StyledButtonBox = styled(Box)(({ theme, circle }) => ({
  ...buttonMixins(theme),
  borderRadius: circle ? 1000 : theme.shape.lg,
}))

const CustomButton = props => {
  return (
    <StyledButtonBox onClick={props.onClick} sx={props.sx} circle={props?.circle}>
      {props.component && props.component}
      {props.icon && <props.icon fontSize="small" />}
    </StyledButtonBox>
  )
}

export default CustomButton

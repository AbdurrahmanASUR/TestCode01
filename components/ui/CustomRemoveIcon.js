import RemoveIcon from '@mui/icons-material/Remove'
import { styled } from '@mui/material'

const StyledRemoveIcon = styled(RemoveIcon)(({ theme, right, left, bottom, top }) => ({
  borderRadius: 100,
  color: theme.palette.error.main,
  border: `2px solid ${theme.palette.error.main}`,
  position: 'absolute',
  ...(top && { top }),
  ...(left && { left }),
  ...(right && { right }),
  ...(bottom && { bottom }),
  '&:hover': {
    background: theme.palette.error.main,
    color: theme.palette.background.default,
  },
  cursor: 'pointer',
}))

const CustomRemoveIcon = props => {
  return (
    <StyledRemoveIcon
      {...props}
      top={props.top}
      left={props.left}
      right={props.right}
      bottom={props.bottom}
    />
  )
}

export default CustomRemoveIcon

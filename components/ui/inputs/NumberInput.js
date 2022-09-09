import styled from '@emotion/styled'
import { ButtonBase, InputBase } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: 0,
  height: 36,
  width: 50,
  flexShrink: 0,
}))
const StyledInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: 36,
  width: '100%',
  '& > input': {
    textAlign: 'center',
    borderLeft: `1px solid ${theme.palette.gray[1]}`,
    borderRight: `1px solid ${theme.palette.gray[1]}`,
    paddingBlock: 0,
    height: 26,
    '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&[type=number]': {
      MozAppearance: 'textfield',
    },
  },
}))

const NumberInput = props => {
  return (
    <>
      <StyledButton onClick={props.onDecrement}>
        <RemoveIcon />
      </StyledButton>
      <StyledInput
        type="number"
        value={props.value}
        onChange={props.onChange}
      />
      <StyledButton onClick={props.onIncrement}>
        <AddIcon />
      </StyledButton>
    </>
  )
}

export default NumberInput

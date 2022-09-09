import { styled, Select, MenuItem } from '@mui/material'

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.text.secondary,

  width: '100%',
  height: 36,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}))

const StyledMenuItem = styled(MenuItem)(props => ({
  color: props.theme.palette.text.secondary,
  backgroundColor:
    props['aria-selected'] == 'true'
      ? `${props.theme.palette.action.selected} !important`
      : 'white',
}))

const SelectInput = props => {
  return (
    <>
      <StyledSelect value={props.value} onChange={props.onSelect} size="small">
        {!props.noInitial && <StyledMenuItem value={0}>Choose</StyledMenuItem>}
        {props.list?.map(size => (
          <StyledMenuItem value={size.size} key={size.size}>
            {size.title}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </>
  )
}

export default SelectInput

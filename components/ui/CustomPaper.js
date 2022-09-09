import { Paper, styled } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderColor: theme.palette.gray[0],
  borderRadius: theme.shape.sm,
}))

const CustomPaper = props => {
  return (
    <StyledPaper variant="outlined" {...props} sx={{ p: 2, ...props.sx }}>
      {props.children}
    </StyledPaper>
  )
}

export default CustomPaper

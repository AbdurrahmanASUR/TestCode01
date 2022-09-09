import { Grid, Paper, styled, Typography } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderColor: theme.palette.gray[1],
  display: 'flex',
  '&:hover': {
    borderColor: theme.palette.gray[2],
  },
}))

const InputWrapper = props => {
  return (
    <Grid container alignItems="center" rowGap={1} sx={props.sx}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" color="text.secondary">
          {props.label}
          {props.component && (
            <>
              :<span style={{ color: 'red' }}>*</span>
            </>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        {props.component && <StyledPaper variant="outlined">{props.component}</StyledPaper>}
        {props.children && props.children}
      </Grid>
    </Grid>
  )
}

export default InputWrapper

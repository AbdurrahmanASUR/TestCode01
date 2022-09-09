import { Divider, Typography, Box } from '@mui/material'

const FooterItem = props => {
  return (
    <Box>
      <Typography color="text.darkPrimary" pb={1} variant="h6">{props.label}</Typography>
      <Divider sx={{mb: 2}}/>
      <Box>{props.children}</Box>
    </Box>
  )
}

export default FooterItem

import { Box, styled, Typography } from '@mui/material'
import { centered } from '../../../mixins/centered'
import Moment from 'react-moment'

const StyledComment = styled(Box)(({ theme }) => ({
  display: 'flex',
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.gray[1]}`,
  },
}))
const StyledImageContainer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: 35,
  height: 35,
  overflow: 'hidden',
  borderRadius: 1000,
  ...centered(),
}))

const Comment = ({ comment }) => {
  return (
    <StyledComment sx={{ py: 2.5 }}>
      <StyledImageContainer>
        <img src={comment.photoURL} alt={comment.displayName} style={{ width: '100%' }} />
      </StyledImageContainer>
      <Box sx={{ flexGrow: 1, ml: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary" fontWeight="bold" mb={1.5}>
            {comment.displayName}
          </Typography>
          <Typography color="text.light">
            <Moment fromNow>{comment.addedDate}</Moment>
          </Typography>
        </Box>
        <Typography color="text.dark75">{comment.comment}</Typography>
      </Box>
    </StyledComment>
  )
}

export default Comment

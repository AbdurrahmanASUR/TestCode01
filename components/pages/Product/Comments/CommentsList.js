import { Box } from '@mui/material'
import { useContext } from 'react'
import Comment from './Comment'
import { CommentContext } from './Comments'

const CommentsList = props => {
  const { comments } = useContext(CommentContext)

  return (
    <Box>
      {comments.map((comment,index) => (
        <Comment comment={comment} key={index} />
      ))}
    </Box>
  )
}

export default CommentsList

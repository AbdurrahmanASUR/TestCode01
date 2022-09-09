import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'
import ForumIcon from '@mui/icons-material/Forum'

export const CommentContext = React.createContext()

const Comments = ({ productId, comments }) => {
  const user = useSelector(state => state.user.user)
  const [productComments, setProductComments] = useState([])

  useEffect(() => {
    setProductComments([...comments])
  }, [comments])

  const addCommentHandler = newComment => {
    setProductComments(state => [newComment, ...state])
  }

  const value = {
    comments: productComments,
    addComment: addCommentHandler,
  }
  return (
    <Box my={2}>
      <CommentContext.Provider value={value}>
        {user && <CommentForm user={user} id={productId} />}
        {productComments.length !== 0 && <CommentsList />}
        {productComments.length === 0 && (
          <Box align="center" sx={{ color: 'text.secondary',my: 6 }}>
            <ForumIcon sx={{fontSize: 50}}/>
            <Typography>There is no comments</Typography>
          </Box>
        )}
      </CommentContext.Provider>
    </Box>
  )
}

export default Comments

import { Box, InputBase, styled } from '@mui/material'
import { useContext, useState } from 'react'

import { centered } from '../../../mixins/centered'
import BasicButton from '../../../ui/BasicButton'

import { set, dbRef, database } from '../../../../firebase'
import { v4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../../store/slices/uiSlice'
import { CommentContext } from './Comments'

const StyledInput = styled(InputBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.gray[1]}`,
  color: theme.palette.text.secondary,
}))

const CommentForm = ({ user, id }) => {
  const [commentValue, setCommentValue] = useState('')
  const dispatch = useDispatch()
  const { addComment } = useContext(CommentContext)

  const submitCommentHandler = event => {
    event.preventDefault()
    if (commentValue.trim().length === 0) {
      dispatch(uiActions.openNotification({ message: "You didn't write a comment!", type: 'error' }))
      return
    }
    const comment = {
      userUid: user.uid,
      comment: commentValue,
      addedDate: new Date().getTime(),
    }
    dispatch(uiActions.openModalLoading())
    set(dbRef(database, 'products/' + id + '/comments/' + v4()), comment)
      .then(() => {
        addComment({ ...comment, displayName: user.displayName, photoURL: user.photoURL })
      })
      .then(() => {
        setCommentValue('')
        dispatch(uiActions.openNotification({ message: 'Added comment!', type: 'success' }))
        dispatch(uiActions.closeModalLoading())
      })
  }

  const commentChangeHandler = event => {
    const currentValue = event.target.value
    setCommentValue(currentValue.slice(0, 500))
  }

  return (
    <Box sx={{ display: 'flex', py: 4 }}>
      <Box sx={{ height: 50, width: 50, overflow: 'hidden', ...centered(), borderRadius: 1000, flexShrink: 0 }}>
        <img src={user.photoURL} alt={user.displayName} style={{ width: '100%' }} />
      </Box>
      <form style={{ flexGrow: 1, marginLeft: 20 }} onSubmit={submitCommentHandler}>
        <StyledInput
          type="text"
          multiline
          minRows={3}
          maxRows={4}
          fullWidth
          placeholder="Write a comment"
          sx={{ px: 1, mb: 2 }}
          value={commentValue}
          onChange={commentChangeHandler}
        />
        <BasicButton variant="contained" sx={{ width: 150 }} type="submit">
          Send
        </BasicButton>
      </form>
    </Box>
  )
}

export default CommentForm

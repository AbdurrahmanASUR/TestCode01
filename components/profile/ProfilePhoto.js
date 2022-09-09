import { Box, CircularProgress, styled, Typography } from '@mui/material'
import { centered } from '../mixins/centered'

const StyledImageContainer = styled(Box)(({ theme }) => ({
  width: 144,
  height: 144,
  borderRadius: 1000,
  overflow: 'hidden',
  backgroundColor: theme.palette.gray[1],
  ...centered(),
  '& *:not(img)': {
    borderRadius: 1000,
  },

  '& .uploadingSpinner': {
    position: 'absolute',
    height: '100%',
    width: '100%',
    ...centered(),
    background: theme.palette.gray[1],
  },
  '& .uploadPhotoOverlay': {
    position: 'absolute',
    height: '100%',
    width: '100%',

    transition: theme.transitions.create(['background', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    ...centered(),
    opacity: 0,
  },
  '&:hover .uploadPhotoOverlay': {
    background: theme.palette.gray[1],
    opacity: 1,
  },
  '& img': {
    width: '100%',
  },
  '& input': {
    opacity: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
  },
}))

const ProfilePhoto = props => {
  return (
    <StyledImageContainer sx={{ position: 'relative' }}>
      <Box className="uploadPhotoOverlay">
        <Typography color="text.secondary" mx={1}>
          Drag and drop the image here
        </Typography>
      </Box>
      {props.isUploading && (
        <Box className="uploadingSpinner">
          <CircularProgress color="secondary" />
        </Box>
      )}
      <input accept="image/*" type="file" onChange={props.onUploadPhoto} />
      <img src={props.photoURL} alt="profile photo" />
    </StyledImageContainer>
  )
}

export default ProfilePhoto

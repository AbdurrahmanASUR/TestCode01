import { IconButton, styled } from '@mui/material'
import { useRouter } from 'next/router'

const StyledIconButton = styled(IconButton)(({ theme, brand }) => ({
  color: theme.palette.text.primary,
  marginRight: 5,
  '&:hover': {
    color: theme.brandColor[brand],
  },
  '& svg': {
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.short,
    }),
  },
}))

const ContactLink = props => {
  return (
    <a href={props.path} target="_blank" rel="noreferrer">
      <StyledIconButton brand={props.brand}>
        {props.icon}
      </StyledIconButton>
    </a>
  )
}

export default ContactLink

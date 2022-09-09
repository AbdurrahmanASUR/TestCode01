import { Box, IconButton, styled } from '@mui/material'
import { useDispatch } from 'react-redux'

import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import FacebookIcon from '@mui/icons-material/Facebook'
import TelegramIcon from '@mui/icons-material/Telegram'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { uiActions } from '../../../store/slices/uiSlice'
import { popupCenter } from '../../../utils/popupCenter'

const StyledIconButton = styled(IconButton)(({ theme, brand }) => ({
  '&:hover': {
    color: theme.brandColor[brand],
  },
  '& svg': {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
    }),
  },
}))

const linksList = [
  { icon: <FacebookIcon />, type: 'facebook' },
  { icon: <TwitterIcon />, type: 'twitter' },
  { icon: <WhatsAppIcon />, type: 'whatsapp' },
  { icon: <TelegramIcon />, type: 'telegram' },
]

const Links = props => {
  const dispatch = useDispatch()

  const openLinkHandler = page => {
    const pageUrl = window.location.href.split('?')[0]
    const message = `${props.name} - ${props.pageName}`

    popupCenter({
      url: `https://www.addtoany.com/add_to/${page}?linkurl=${pageUrl}&linkname=${message}`,
      title: 'tm closet',
      w: 600,
      h: 400,
    })
  }

  const copyUrlHandler = () => {
    navigator.clipboard.writeText(window.location.href.split('?')[0])
    dispatch(uiActions.openNotification({ message: 'Copied', type: 'success' }))
  }

  return (
    <Box align="center">
      {linksList.map(({ icon, type }) => (
        <StyledIconButton brand={type} onClick={openLinkHandler.bind(null, type)} key={type}>
          {icon}
        </StyledIconButton>
      ))}
      <StyledIconButton onClick={copyUrlHandler}>
        <ContentCopyIcon />
      </StyledIconButton>
    </Box>
  )
}

export default Links

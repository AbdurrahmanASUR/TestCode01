import { Box, Container, Grid, List, ListItem, styled, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import ContactLink from './ContactLink'
import FooterItem from './FooterItem'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const linksList = [
  { path: 'https://www.facebook.com/iAboKhaled2002', icon: <FacebookIcon />, brand: 'facebook' },
  { path: 'https://twitter.com/iAboKhaled_2002', icon: <TwitterIcon />, brand: 'twitter' },
  { path: 'https://www.instagram.com/abdurrahman_asur/', icon: <InstagramIcon />, brand: 'instagram' },
  {
    path: 'https://api.whatsapp.com/send/?phone=905526217542&text&type=phone_number&app_absent=0',
    icon: <WhatsAppIcon />,
    brand: 'whatsapp',
  },
]

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.text.darkPrimary,
  },
}))

const StyledPaymentImage = styled('img')(({ theme }) => ({
  height: 30,
}))

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4} sx={{ py: 4 }}>
          <Grid item xs={12} md={4}>
            <FooterItem label="Who We Are?">
              <Typography color="text.primary">
              Shop by menswear professionals according to special standards. We care about the smallest details and offer you our products with the best specifications and the most beautiful models that highlight your wonderful appearance and increase the beauty of your presence
              </Typography>
            </FooterItem>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterItem label="Important Links">
              <List disablePadding>
                <ListItem disablePadding sx={{ pb: 2 }}>
                  <Link href="/exchange-and-return-policy">
                    <StyledLink>Exchange and return policy</StyledLink>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ pb: 2 }}>
                  <Link href="/privacy-policy">
                    <StyledLink>Privacy policy</StyledLink>
                  </Link>
                </ListItem>
              </List>
            </FooterItem>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterItem label="Contact Us">
              {linksList.map(link => (
                <ContactLink brand={link.brand} icon={link.icon} path={link.path} key={link.brand} />
              ))}
            </FooterItem>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Box>
            <Typography color="text.light" variant="body2" align="center">
              Copyright TM 1 CLOSET © 2022 Made by |{' '}
              <MuiLink
                href="https://www.facebook.com/iAboKhaled2002"
                target="_blank"
                color="text.darkPrimary"
                underline="hover"
              >
                Abdurrahman ASUR
              </MuiLink>
            </Typography>
          </Box>
          <Box>
            <StyledPaymentImage
              src="https://firebasestorage.googleapis.com/v0/b/tm1closettest.appspot.com/o/payment-method-icons%2Fpaypal.png?alt=media&token=bc7d798f-fc85-4a99-aa49-490d2e888ddd"
              alt="paypal"
            />
          </Box>
        </Box>
      </Container>
    </footer>
  )
}

export default Footer

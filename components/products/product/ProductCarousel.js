import { Box, Grid, styled, Typography } from '@mui/material'
import Slider from 'react-slick'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { Fancybox } from '@fancyapps/ui'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fancyapps/ui/dist/fancybox.css'

import Links from './Links'

const StyledCarouselGrid = styled(Grid)(({ theme }) => ({
  '& .slick-slider': {
    marginBottom: 40,
  },
  '& .slick-dots': {
    bottom: -30,
  },
  '& .slick-dots li': {
    marginInline: 3,
  },
  '& .slick-dots li button::before': {
    color: '#D6D6D6',
    fontSize: 10,
    opacity: 1,
  },
  '& .slick-dots li.slick-active button::before': {
    color: '#869791',
    opacity: 1,
  },
  '& .slick-dots li:hover button::before': {
    color: '#869791',
    opacity: 1,
  },

  '& .slick-arrow::before': {
    content: '""',
  },

  '& .slick-slide *:Focus-visible': {
    outline: 'none',
  },
}))

function CustomArrow(props) {
  const { className, onClick } = props
  const dirRight = props.dir === 'right'
  return (
    <Box
      className={className}
      style={{
        background: '#A5A5A5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 40,
        borderRadius: 5,
        right: dirRight ? 10 : 'inherit',
        left: dirRight ? 'inherit' : 10,
        zIndex: 2,
      }}
      onClick={onClick}
    >
      {!dirRight && <ArrowBackIosNewIcon color="primary" />}
      {dirRight && <ArrowForwardIosIcon color="primary" />}
    </Box>
  )
}

const ProductCarousel = ({ product }) => {
  return (
    <StyledCarouselGrid item xs={12} md={5}>
      {product.images && (
        <Slider
          dots={true}
          adaptiveHeight={true}
          prevArrow={<CustomArrow dir="left" />}
          nextArrow={<CustomArrow dir="right" />}
          infinite={false}
        >
          {product.images.map((image, index) => (
            <a data-fancybox="gallery" href={image} key={image}>
              <img src={image} style={{ width: '100%' }} alt={product.name + ' - ' + (index + 1)} />
            </a>
          ))}
        </Slider>
      )}
      {!product.images && (
        <Typography align="center" my={10} variant="h5" component="p">
          There is no images
        </Typography>
      )}

      <Links name={product.name} pageName="TM CLOSET" />
    </StyledCarouselGrid>
  )
}

export default ProductCarousel

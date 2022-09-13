import { Grid } from '@mui/material'
import FeatureItem from './FeatureItem'
import SectionContainer from './SectionContainer'

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckroomIcon from '@mui/icons-material/Checkroom';

const featureList = [
  {
    icon: <LocalPhoneOutlinedIcon />,
    title: 'Customers service',
    subtitle: 'We are happy to receive your inquiries around the clock',
  },
  {
    icon: <LocalShippingOutlinedIcon />,
    title: 'Shipping',
    subtitle: 'We have worldwide shipping',
  },
  {
    icon: <CheckroomIcon />,
    title: 'High quality',
    subtitle: 'All clothes are designed according to the best international standards of high quality',
  },
]

const Feature = () => {
  return (
    <SectionContainer label="Features">
      <Grid container spacing={4}>
        {featureList.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <FeatureItem {...feature} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )
}

export default Feature

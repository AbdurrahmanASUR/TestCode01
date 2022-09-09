import { Menu, MenuItem, styled, Typography } from '@mui/material'
import ReactCountryFlag from 'react-country-flag'

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

import CustomButton from '../../ui/CustomButton'

import { currencyList } from '../../../constants/currencies'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& > .MuiPaper-root': {
    boxShadow: theme.shadows[1],
  },
}))

const CurrencyButton = props => {
  return (
    <>
      <CustomButton
        onClick={props.onOpenCurrency}
        icon={CurrencyExchangeIcon}
        sx={{ display: { xs: 'none', md: 'flex' }, width: 100 }}
        circle="true"
      />
      <StyledMenu
        id="currency-menu"
        anchorEl={props.anchorEl}
        open={!!props.anchorEl}
        onClose={props.onCloseCurrency}
      >
        {Object.keys(currencyList)?.map((currency, index) => {
          const type = currencyList[currency]

          return (
            <MenuItem onClick={props.onSelectCurrency.bind(null, type.currencyCode)} key={index}>
              <ReactCountryFlag
                countryCode={type.countryCode}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '5px',
                }}
                title={type.countryCode}
              />
              <Typography color="text.secondary">{type.title}</Typography>
            </MenuItem>
          )
        })}
      </StyledMenu>
    </>
  )
}

export default CurrencyButton

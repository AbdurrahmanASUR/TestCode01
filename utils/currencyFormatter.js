import { localCurrencies } from '../constants/currencies'

export const currencyFormatter = (number = 0, currency = 'USD') => {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency }).format(
    number * localCurrencies[currency]
  )
}

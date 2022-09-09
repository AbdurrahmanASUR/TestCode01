import { localCurrencies } from '../constants/currencies'

export const checkCurrencyQuery = currencyQuery => {
  if (currencyQuery in localCurrencies) return currencyQuery
  return 'USD'
}

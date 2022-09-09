import { sortProductsList } from '../../utils/sortProductsList'
import { getProducts } from './get-products'

export async function getFilteredProducts(search) {
  const products = await getProducts()

  const sortedProducts = sortProductsList(products, 'newest')
  const filteredProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(search))

  return filteredProducts
}
export default async function handler(req, res) {
  res.status(200).json({ message: 'hello' })
}

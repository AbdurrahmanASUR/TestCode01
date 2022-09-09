import { sortProductsList } from '../../utils/sortProductsList'

const productEachPage = 12

export async function getPage(pageId, sortType) {
  const selectedPage = +pageId || 1

  const response = await fetch(
    'https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/products.json',
    { method: 'GET' }
  )
  const data = await response.json()

  // convert object of object to array of object
  const transformedProductList = Object.keys(data).map(key => ({ ...data[key], id: key }))

  // sort products list
  const sortedProductsList = sortProductsList(transformedProductList, sortType)

  // initialize
  const pages = []
  let products = []
  const count = Object.keys(data).length

  sortedProductsList.forEach((product, index) => {
    // adding product to page
    products.push(product)

    // if page filled with product
    if (products.length === productEachPage || count === index + 1) {
      // add page to pages
      pages.push({ items: products, count })
      // clear the product per page
      products = []
    }
  })
  // return the page
  return { page: pages[selectedPage - 1] }
}
export default async function handler(req, res) {
  res.status(200).json({ message: 'hello' })
}

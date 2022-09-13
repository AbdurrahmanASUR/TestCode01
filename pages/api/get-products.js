export async function getProducts() {
  const response = await fetch(
    'https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/products-2.json',
    { method: 'GET' }
  )
  const data = await response.json()

  // convert object of object to array of object
  const transformedProductList = Object.keys(data).map(key => ({ ...data[key], id: key }))

  return transformedProductList
}
export default async function handler(req, res) {
  res.status(200).json({ message: 'hello' })
}

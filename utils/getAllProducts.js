export const getAllProducts = async () => {
  const res = await fetch(
    `https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app/products.json`
  )
  if (!res.ok) {
    return 'Cant get products'
  }
  const data = await res.json()

  const allProducts = []

  for (const pageKey in data) {
    for (const productKey in data[pageKey].items) {
      allProducts.push({ ...data[pageKey].items[productKey], id: productKey })
    }
  }
  return allProducts
}

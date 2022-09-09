export const sortProductsList = (list, type = 'newest') => {
  switch (type) {
    case 'priceLowToHigh':
      return list.sort((a, b) => a.price - b.price)
    case 'priceHighToLow':
      return list.sort((a, b) => b.price - a.price)
    case 'oldest':
      return list.sort((a, b) => {
        if (a.addedDate < b.addedDate) return -1
        if (a.addedDate > b.addedDate) return 1
        return 0
      })
    case 'newest':
      return list.sort((a, b) => {
        if (a.addedDate > b.addedDate) return -1
        if (a.addedDate < b.addedDate) return 1
        return 0
      })
    default:
      return list.sort((a, b) => {
        if (a.addedDate > b.addedDate) return -1
        if (a.addedDate < b.addedDate) return 1
        return 0
      })
  }
}

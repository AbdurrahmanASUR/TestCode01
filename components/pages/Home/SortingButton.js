import { useState } from 'react'
import { useRouter } from 'next/router'

import { Menu, MenuItem, Typography } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'

import CustomButton from '../../ui/CustomButton'

const sortingTypeList = [
  { title: 'Highest Price', value: 'priceHighToLow' },
  { title: 'Lowest Price', value: 'priceLowToHigh' },
  { title: 'Oldest', value: 'oldest' },
  { title: 'Newest', value: 'newest' },
]

const SortingButton = props => {
  const router = useRouter()
  const [sortAnchorEl, setSortAnchorEl] = useState(null)

  const openSortMenuHandler = event => {
    setSortAnchorEl(event.currentTarget)
  }
  const closeSortMenuHandler = () => {
    setSortAnchorEl(null)
  }

  const selectSortHandler = sortType => {
    router.push({ pathname: router.pathname, query: { ...router.query, sort: sortType } })
    closeSortMenuHandler()
  }
  return (
    <>
      <CustomButton
        onClick={openSortMenuHandler}
        component={
          <Typography variant="h6" mr={1}>
            Sort
          </Typography>
        }
        icon={SortIcon}
        sx={{ width: 'fit-content', px: 2, mx: 1 }}
        circle="true"
      />
      <Menu
        id="sort-menu"
        anchorEl={sortAnchorEl}
        open={!!sortAnchorEl}
        onClose={closeSortMenuHandler}
      >
        {sortingTypeList.map((sort, index) => (
          <MenuItem onClick={selectSortHandler.bind(null, sort.value)} key={index}>
            <Typography color="text.secondary">{sort.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default SortingButton

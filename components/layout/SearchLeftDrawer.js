import { Drawer, InputBase, List, Paper, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredProducts } from '../../pages/api/get-filtered-products'
import { uiActions } from '../../store/slices/uiSlice'
import SearchProduct from './SearchProduct'

const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.secondary,
  width: '100%',
}))
const drawerWidth = 300

const SearchLeftDrawer = () => {
  const searchOpen = useSelector(state => state.ui.searchOpen)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')
  const [searchedProducts, setSearchedProducts] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      const filteredProducts = await getFilteredProducts(searchValue)
      setSearchedProducts(filteredProducts)

    }
    getAllProducts()
  }, [searchValue])

  const closeSearchDrawerHandler = () => {
    dispatch(uiActions.closeSearchDrawer())
  }

  const changeSearchHandler = event => {
    setSearchValue(event.target.value)
  }

  return (
    <Drawer
      open={searchOpen}
      anchor="left"
      onClose={closeSearchDrawerHandler}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: drawerWidth,
          width: '80%',
        },
      }}
    >
      <Paper variant="outlined" sx={{ borderColor: theme => theme.palette.gray[1], mt: 3, mx: 1, mb: 1 }}>
        <StyledSearchInput
          placeholder="Search product by name"
          sx={{ p: 1 }}
          value={searchValue}
          onChange={changeSearchHandler}
        />
      </Paper>

      <List
        sx={{
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        
        {searchedProducts.map(product => (
          <SearchProduct product={product} key={product.id} onCloseSearch={closeSearchDrawerHandler}/>
        ))}
      </List>
    </Drawer>
  )
}

export default SearchLeftDrawer

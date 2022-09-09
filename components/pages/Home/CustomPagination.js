import { useRouter } from 'next/router'
import { Pagination } from '@mui/material'

const CustomPagination = props => {
  const router = useRouter()
  const currentPage = parseInt(router.query.page || 1)
  
  return (
    <Pagination
      count={Math.ceil(props.page.count / 12)}
      page={currentPage}
      onChange={(e, value) => {
        router.replace({ pathname: '/', query: { ...router.query, page: value } })
      }}
      sx={{ width: 'fit-content', mx: 'auto', my: { xs: 2, sm: 3, md: 4 } }}
      size="large"
      siblingCount={0}
    />
  )
}

export default CustomPagination

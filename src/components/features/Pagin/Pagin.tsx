import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import React, {ChangeEvent} from 'react';

type PaginType = {
  page: number
  totalPages: number | undefined
  handleChangePage: (event: ChangeEvent<unknown>, value: number) => void

}

export default React.memo(function Pagin({page, totalPages, handleChangePage}: PaginType) {
  return (
    <Container
      fixed
      sx={{
        pb: 3,
        pt: 3,
        justifyContent: 'center',
        display: 'flex'
      }}>
      {totalPages && totalPages > 0
        ? <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}/>
        : null}
    </Container>
  )
})
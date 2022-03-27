import {useDispatch} from 'react-redux';
import {usersApi} from '../../../api/usersApi';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {setLoading} from '../../../store/slice/appSlice';
import Grid from '@mui/material/Grid';
import AreaCard from '../../features/AreaCard';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';

export default function Users() {
  const dispatch = useDispatch()

  const [page, setPage] = useState<number>(1)

  const {data, isLoading} = usersApi.useFetchAllUsersQuery({page})
  const {responseData, totalPages} = {...data}

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [dispatch, isLoading])

  return (
    <Grid
      container
      spacing={{xs: 4, md: 6}}
      justifyContent="center"
      alignItems="center"
      paddingTop={6}
      paddingBottom={6}>
      {responseData && responseData.map(user => (
        <Grid item key={user.id}>
          <AreaCard
            name={user.name}
            username={user.username}
            companyName={user.company.name}
            website={user.website}
            phone={user.phone}
            email={user.email}
            location={user.address.geo}
          />
        </Grid>
      ))}
      <Container
        fixed
        sx={{pt: 4, justifyContent: 'center', display: 'flex'}}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}/>
      </Container>
    </Grid>
  )
}
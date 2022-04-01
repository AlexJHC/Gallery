import {useDispatch, useSelector} from 'react-redux';
import {dataApi} from '../../../api/dataApi';
import React, {ChangeEvent, useCallback} from 'react';
import Grid from '@mui/material/Grid';
import AreaCard from './UserCard';
import Pagin from '../../features/Pagin/Pagin';
import Loading from '../../features/Loading/Loading';
import Error from '../../features/Alert/Error';
import {RootState} from '../../../store/store';
import {setCurrentPage} from '../../../store/slice/userSlice';

export default function Users() {
  const dispatch = useDispatch()

  const page = useSelector<RootState, number>(state => state.users.currentPage)

  const {data, isFetching, isError} = dataApi.useFetchAllUsersQuery({page, limit: 3})
  const {responseData, totalPages} = {...data}

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  }, [dispatch])

  if (isError) return <Error/>
  if (isFetching) return <Loading/>

  return (
    <Grid
      container
      spacing={{xs: 4, md: 6}}
      justifyContent="center"
      alignItems="center"
      paddingTop={6}
      paddingBottom={6}>
      {responseData &&
        responseData.map(user => (
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
      <Pagin
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}/>
    </Grid>
  )
}
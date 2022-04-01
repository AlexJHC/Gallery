import {useDispatch, useSelector} from 'react-redux';
import {dataApi} from '../../../api/dataApi';
import React, {ChangeEvent, useCallback} from 'react';
import Grid from '@mui/material/Grid';
import UserCard from './UserCard';
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
    <>
      <Grid
        container
        spacing={{xs: 4, md: 6}}
        justifyContent='center'
        alignItems='self-start'
        paddingTop={6}
        paddingBottom={6}>
        <UserCard users={responseData}/>
      </Grid>
      <Pagin
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}/>
    </>
  )
}
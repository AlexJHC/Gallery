import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {dataApi} from '../../../api/dataApi';
import {setError, setLoading} from '../../../store/slice/appSlice';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import {RootState} from '../../../store/store';
import Pagin from '../../features/Pagin/Pagin';
import BlogSearchSort from './BlogSearchSort';
import BlogCard from './BlogCard';
import {ActionFilterType, InitialAppStateType, setFilter, setSearch} from '../../../store/slice/blogSlice';

export default function Blog() {

  const dispatch = useDispatch()
  const {search, filter} = useSelector<RootState, InitialAppStateType>(state => state.blog)
  const {order, sort} = {...filter}

  const [page, setPage] = useState(1)

  const {data, isLoading, isError} = dataApi.useFetchAllPostsQuery({
    sort,
    order,
    page,
    search
  })
  const {responseData, totalPages} = {...data}

  const {data: dataResponse, isLoading: userLoading} = dataApi.useFetchAllUsersQuery({})
  const {responseData: usersResponse} = {...dataResponse}

  const handleTitleSearch = useCallback((value: string) =>
    dispatch(setSearch(value)), [dispatch])

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, [])

  const handleResetPage = useCallback(() => {
    setPage(1);
  }, [])

  const blogIsLoading = isLoading && userLoading

  const handleFilter = useCallback((filter: ActionFilterType) => {
    dispatch(setFilter(filter))
  }, [dispatch])

  useEffect(() => {
    dispatch(setLoading(blogIsLoading))
    dispatch(setError(isError))
  }, [dispatch, blogIsLoading, isError])

  return (
    <>
      <BlogSearchSort
        handleTitleSearch={handleTitleSearch}
        handleFilter={handleFilter}
        handleResetPage={handleResetPage}/>
      <Grid
        container
        spacing={{xs: 2, md: 4}}
        justifyContent="center"
        alignItems="center"
        paddingTop={6}
        paddingBottom={6}>
        <BlogCard
          responseData={responseData}
          usersResponse={usersResponse}/>
      </Grid>
      <Pagin
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}/>
    </>
  )
}
import React, {ChangeEvent, useCallback} from 'react';
import {dataApi} from '../../../api/dataApi';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import {RootState} from '../../../store/store';
import Pagin from '../../features/Pagin/Pagin';
import BlogSearchSort from './BlogSearchSort';
import BlogCard from './BlogCard';
import {
  ActionFilterType,
  InitialBlogStateType,
  setCurrentPage,
  setFilter,
  setSearch
} from '../../../store/slice/blogSlice';
import Loading from '../../features/Loading/Loading';
import Error from '../../features/Alert/Error';

export default function Blog() {

  const dispatch = useDispatch()
  const {
    search,
    filter,
    currentPage: page,
    filterValue
  } = useSelector<RootState, InitialBlogStateType>(state => state.blog)
  const {order, sort} = {...filter}

  const {data, isFetching, isError} = dataApi.useFetchAllPostsQuery({
    sort,
    order,
    page,
    search
  })
  const {responseData, totalPages} = {...data}

  const {data: dataResponse, isFetching: blogFetching, isError: blogError} = dataApi.useFetchAllUsersQuery({})
  const {responseData: usersResponse} = {...dataResponse}

  const handleTitleSearch = useCallback((value: string) =>
    dispatch(setSearch(value)), [dispatch])

  const handleResetPage = useCallback(() => {
    dispatch(setCurrentPage(1))
  }, [dispatch])

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  }, [dispatch])

  const handleFilter = useCallback((filter: ActionFilterType) => {
    dispatch(setFilter(filter))
  }, [dispatch])

  if (isError || blogError) return <Error/>
  if (isFetching || blogFetching) return <Loading/>

  return (
    <>
      <BlogSearchSort
        filterValue={filterValue}
        handleResetPage={handleResetPage}
        searchValue={search}
        handleTitleSearch={handleTitleSearch}
        handleFilter={handleFilter}/>
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
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {usersApi} from '../../../api/usersApi';
import {setLoading} from '../../../store/slice/appSlice';
import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {FormControl, InputLabel, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {AppDispatch} from '../../../store/store';
import Container from '@mui/material/Container';
import Pagin from '../../features/Pagin/Pagin';
import BlogSearchSort from './BlogSearchSort';

export default function Blog() {

  const dispatch = useDispatch<AppDispatch>()

  const [selectValue, setSelectValue] = useState('');
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState('')

  const {data, isLoading} = usersApi.useFetchAllPostsQuery({
    sort,
    order,
    page,
    search
  })
  const {responseData, totalPages} = {...data}

  const handleTitleSearch = (e: any) => setSearch(e.target.value)
  const handleClearSearch = () => setSearch('')

  const sortChanger = (value: string) => {
    switch (value) {
      case 'id-up' :
        setSort('userId')
        setOrder('asc')
        break
      case 'id-down' :
        setSort('userId')
        setOrder('desc')
        break
      case 'title-up' :
        setSort('title')
        setOrder('asc')
        break
      case 'title-down' :
        setSort('title')
        setOrder('desc')
        break
      default :
        setSort('')
        setOrder('')
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value);
  };

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, [])

  console.log(1)


  useEffect(() => {
    dispatch(setLoading(isLoading))
    sortChanger(selectValue)
  }, [dispatch, isLoading, responseData, selectValue])

  return (
    <>
      <BlogSearchSort
        search={search}
        handleClearSearch={handleClearSearch}
        selectValue={selectValue}
        handleChange={handleChange}
        handleTitleSearch={handleTitleSearch}/>
      <Grid
        container
        spacing={{xs: 2, md: 4}}
        justifyContent="center"
        alignItems="center"
        paddingTop={6}
        paddingBottom={6}>
        {responseData && responseData.map(item =>
          <Grid item key={item.id}>
            <div>{item.title}</div>
          </Grid>)}
      </Grid>
      <Pagin
        page={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}/>
    </>
  )
}
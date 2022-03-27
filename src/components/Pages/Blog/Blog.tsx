import React, {ChangeEvent, useEffect, useState} from 'react';
import {usersApi} from '../../../api/usersApi';
import {setLoading} from '../../../store/slice/appSlice';
import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import {FormControl, InputLabel, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {AppDispatch} from '../../../store/store';

export default function Blog() {

  const dispatch = useDispatch<AppDispatch>()

  const [selectValue, setSelectValue] = useState('none');
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

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(setLoading(isLoading))
    console.log(selectValue)
    sortChanger(selectValue)
  }, [dispatch, isLoading, responseData, selectValue])

  return (
    <Paper
      sx={{
        p: 10,
        margin: 'auto',
        // maxWidth: ,
        // flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column'
      }}
      variant="outlined"
    >
      <Box sx={{display: 'flex', alignItems: 'stretch', justifyContent: 'space-around', width: '100vw'}}>
        {/*<SearchIcon/>*/}
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <TextField id="input-with-sx"
                     label="Search"
                     variant="standard"
                     value={search}
                     onChange={handleTitleSearch}/>
          <IconButton
            color="default"
            aria-label="upload picture"
            component="button"
            onClick={handleClearSearch}>
            {search && <HighlightOffIcon/>}
          </IconButton>
        </div>
        <FormControl sx={{m: 1, minWidth: 200}}>
          <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectValue}
            onChange={handleChange}
            autoWidth
            label="Sort">
            <MenuItem value='none'>
              <em>none</em>
            </MenuItem>
            <MenuItem value='id-up'>id: 1 -10</MenuItem>
            <MenuItem value='id-down'>id: 10 - 1</MenuItem>
            <MenuItem value='title-up'>title: a - z</MenuItem>
            <MenuItem value='title-down'>title: z - a</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
      {totalPages && totalPages > 0 ?
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}/> : null}
    </Paper>
  )
}
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import React, {ChangeEvent, useState} from 'react';
import {ActionFilterType} from '../../../store/slice/blogSlice';
import {useDebounce} from '../../features/Debounce/useDebounce';

type PropsBlogSearchSortType = {
  handleTitleSearch: (value: string) => void
  handleFilter: (filter: ActionFilterType) => void
  handleResetPage: () => void
  searchValue: string
}

export default React.memo(function BlogSearchSort({
                                                    searchValue,
                                                    handleTitleSearch,
                                                    handleFilter,
                                                    handleResetPage
                                                  }: PropsBlogSearchSortType) {

  const [search, setSearch] = useState<string>(searchValue)

  const handleSelect = (event: SelectChangeEvent) => {
    handleFilter(event.target.value as ActionFilterType)
  }

  const handleClearSearch = () => setSearch('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    handleResetPage()
  }

  useDebounce(
    () => {
      handleTitleSearch(search)
    }, 800, [search])

  const disableDeleteButton = search.length === 0

  return (
    <Container fixed sx={{
      pt: 3,
      display: 'grid',
      gap: 3,
      justifyContent: 'center',
      gridTemplateColumns: {s: '1fr 1fr', md: '350px 350px'},
    }}>
      <FormControl sx={{maxWidth: 350}}>
        <InputLabel htmlFor="Search">Search</InputLabel>
        <OutlinedInput
          id="Search"
          type='text'
          value={search}
          onChange={handleSearch}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={disableDeleteButton}
                onClick={handleClearSearch}
                aria-label="clear search field"
                edge="end">
                <HighlightOffIcon/>
              </IconButton>
            </InputAdornment>}
          label="Search"/>
      </FormControl>
      <FormControl sx={{maxWidth: 350}}>
        <InputLabel id="Sort">Sort</InputLabel>
        <Select
          variant='outlined'
          labelId="Sort"
          defaultValue=""
          onChange={handleSelect}
          autoWidth
          label="Sort">
          <MenuItem value=''>
            <em>none</em>
          </MenuItem>
          <MenuItem
            value='BLOG/FILTER_ID_UP'>
            id: 1 - 10
          </MenuItem>
          <MenuItem
            value='BLOG/FILTER_ID_DOWN'>
            id: 10 - 1
          </MenuItem>
          <MenuItem
            value='BLOG/FILTER_TITLE_UP'>
            title: a - z
          </MenuItem>
          <MenuItem
            value='BLOG/FILTER_TITLE_DOWN'>
            title: z - a
          </MenuItem>
        </Select>
      </FormControl>
    </Container>
  )
})
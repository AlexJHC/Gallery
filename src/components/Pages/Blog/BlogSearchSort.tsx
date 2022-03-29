import {FormControl, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import React, {ChangeEvent} from 'react';
import {ActionFilterType} from '../../../store/slice/blogSlice';
type PropsBlogSearchSortType = {
  search: string
  handleTitleSearch: (value:string) => void
  handleClearSearch: () => void
  handleFilter: (filter: ActionFilterType) => void
  handleResetPage: () => void
}

export default React.memo(function BlogSearchSort({
                                                    search,
                                                    handleTitleSearch,
                                                    handleClearSearch,
                                                    handleFilter,
                                                    handleResetPage
                                                  }: PropsBlogSearchSortType) {


  const handleSelect = (event: SelectChangeEvent) => {
    handleFilter(event.target.value as ActionFilterType)
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    handleTitleSearch(e.target.value)
    handleResetPage()
  }

  const disableDeleteButton = search.length === 0

  console.log('BlogSearch')
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
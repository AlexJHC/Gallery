import {FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import React from 'react';

type PropsBlogSearchSortType = {
  search: string
  handleTitleSearch: (e: any) => void
  handleClearSearch: () => void
  selectValue: string
  handleChange: (event: SelectChangeEvent) => void
}

export default function BlogSearchSort({
                                         search,
                                         handleTitleSearch,
                                         handleClearSearch,
                                         selectValue,
                                         handleChange
                                       }: PropsBlogSearchSortType) {
  return (
    <Container fixed sx={{
      minWidth: '100vw',
      pt: 3,
      display: 'grid',
      gap: 3,
      justifyContent: 'center',
      gridTemplateColumns: {s:'1fr 1fr',md:'350px 350px'},
    }}>
      <FormControl sx={{maxWidth: 350}}>
        <InputLabel htmlFor="Search">Search</InputLabel>
        <OutlinedInput
          id="Search"
          type='text'
          value={search}
          onChange={handleTitleSearch}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end">
                <HighlightOffIcon/>
              </IconButton>
            </InputAdornment>}
          label="Search"
        />

        {/*<IconButton*/}
        {/*  disabled={search.length === 0}*/}
        {/*  color="default"*/}
        {/*  aria-label="delete search"*/}
        {/*  component="button"*/}
        {/*  onClick={handleClearSearch}>*/}
        {/*  <HighlightOffIcon/>*/}
        {/*</IconButton>*/}

      </FormControl>
      <FormControl sx={{maxWidth: 350}}>
        <InputLabel id="Sort">Sort</InputLabel>
        <Select
          variant='outlined'
          labelId="Sort"
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
    </Container>
  )
}
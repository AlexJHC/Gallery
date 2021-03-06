import {FormControl, InputLabel, Select} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import {AlbumType} from '../../../api/dataApi';
import Container from '@mui/material/Container';
import Loading from '../../features/Loading/Loading';

type PropsGalleryFilterType = {
  isFetching: boolean
  albumId: string
  handleChangeFilter: (event: SelectChangeEvent) => void
  albums: AlbumType[] | undefined
}

export default React.memo(function GalleryFilter({
                                                   isFetching,
                                                   albumId,
                                                   handleChangeFilter,
                                                   albums
                                                 }: PropsGalleryFilterType) {
  return (
    <>
      {isFetching && <Loading/>}
      <Container fixed sx={{
        pt: 3,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
      }}>
        <FormControl sx={{width: {xs: 300, md: 350}}}>
          <InputLabel id="AlbumFilter">Album Filter</InputLabel>
          <Select
            disabled={isFetching}
            id="AlbumFilter"
            value={albumId}
            onChange={handleChangeFilter}
            label="Album Filter">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {albums &&
              albums.map(album =>
                <MenuItem
                  key={album.id}
                  value={album.id}>
                  {album.title}
                </MenuItem>)}
          </Select>
        </FormControl>
      </Container>
    </>
  )
})
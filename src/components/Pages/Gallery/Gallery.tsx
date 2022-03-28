import {usersApi} from '../../../api/usersApi';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {setLoading} from '../../../store/slice/appSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import Grid from '@mui/material/Grid';
import Pagin from '../../features/Pagin/Pagin';
import {SelectChangeEvent} from '@mui/material/Select';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';

export default function Gallery() {

  const dispatch = useDispatch<AppDispatch>()

  const [page, setPage] = useState<number>(1)
  // AlbumID from select for AlbumFilter
  const [albumId, setAlbumId] = useState<string>('')

  const {data, isLoading} = usersApi.useFetchPhotosQuery({albumId, page})
  const {responseData, totalPages} = {...data}

  const {data: albums, isLoading: albumLoading} = usersApi.useFetchAlbumsQuery({})

  const galleryIsLoading = isLoading && albumLoading

  useEffect(() => {
    dispatch(setLoading(galleryIsLoading))
  }, [dispatch, galleryIsLoading])

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, [])

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    setAlbumId(event.target.value);
  }, [])

  return (
    <>
      <GalleryFilter
        albums={albums}
        albumId={albumId}
        handleChangeFilter={handleChangeFilter}/>
      <Grid
        container
        spacing={{xs: 4, md: 6}}
        justifyContent="center"
        alignItems="self-start"
        paddingTop={6}
        paddingBottom={6}>
        <GalleryCard
          albums={albums}
          responseData={responseData}/>
        <Pagin
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}/>
      </Grid>
    </>
  )
}
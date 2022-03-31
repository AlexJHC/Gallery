import {dataApi} from '../../../api/dataApi';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {setError, setLoading} from '../../../store/slice/appSlice';
import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagin from '../../features/Pagin/Pagin';
import {SelectChangeEvent} from '@mui/material/Select';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';

export default function Gallery() {

  const dispatch = useDispatch()

  const [page, setPage] = useState<number>(1)
  // AlbumID from select for AlbumFilter
  const [albumId, setAlbumId] = useState<string>('')

  const {data, isLoading, isError} = dataApi.useFetchPhotosQuery({albumId, page})
  const {responseData, totalPages} = {...data}

  const {data: albums, isLoading: albumLoading} = dataApi.useFetchAlbumsQuery({})

  const galleryIsLoading = isLoading && albumLoading

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, [])

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    setAlbumId(event.target.value);
    setPage(1)
  }, [])

  useEffect(() => {
    dispatch(setLoading(galleryIsLoading))
    dispatch(setError(isError))
  }, [dispatch, galleryIsLoading, isError])

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
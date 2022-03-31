import {dataApi} from '../../../api/dataApi';
import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagin from '../../features/Pagin/Pagin';
import {SelectChangeEvent} from '@mui/material/Select';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';
import Loading from '../../features/Loading/Loading';
import Error from '../../features/Alert/Error';

export default function Gallery() {

  const dispatch = useDispatch()

  const [page, setPage] = useState<number>(1)
  // AlbumID from select for AlbumFilter
  const [albumId, setAlbumId] = useState<string>('')

  const {data, isFetching, isError} = dataApi.useFetchPhotosQuery({albumId, page})
  const {responseData, totalPages} = {...data}

  const {
    data: albums,
    isFetching: albumFetching,
    isError: albumError
  } = dataApi.useFetchAlbumsQuery({})

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, [])

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    setAlbumId(event.target.value);
    setPage(1)
  }, [])

  if (isError || albumError) return <Error/>
  if (isFetching || albumFetching) return <Loading/>

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
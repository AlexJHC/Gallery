import {dataApi} from '../../../api/dataApi';
import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagin from '../../features/Pagin/Pagin';
import {SelectChangeEvent} from '@mui/material/Select';
import GalleryFilter from './GalleryFilter';
import GalleryCard from './GalleryCard';
import Loading from '../../features/Loading/Loading';
import Error from '../../features/Alert/Error';
import {RootState} from '../../../store/store';
import {InitialGalleryStateType, setAlbumFilter, setCurrentPage} from '../../../store/slice/gallerySlice';

export default function Gallery() {

  const dispatch = useDispatch()
  const {
    currentPage: page,
    filter: albumId
  } = useSelector<RootState, InitialGalleryStateType>(state => state.gallery)


  const {data, isFetching, isError} = dataApi.useFetchPhotosQuery({albumId, page})
  const {responseData, totalPages} = {...data}

  const {
    data: albums,
    isFetching: albumFetching,
    isError: albumError
  } = dataApi.useFetchAlbumsQuery({})

  const handleChangePage = useCallback((event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }, [dispatch])

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    dispatch(setAlbumFilter(event.target.value))
  }, [dispatch])

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
        justifyContent='center'
        alignItems='self-start'
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
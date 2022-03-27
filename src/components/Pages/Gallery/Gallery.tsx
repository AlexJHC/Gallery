import {usersApi} from '../../../api/usersApi';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {setLoading} from '../../../store/slice/appSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Card from '@mui/material/Card';
import {CardActionArea, CardMedia} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Gallery() {

  const dispatch = useDispatch<AppDispatch>()

  const [page, setPage] = useState(1)

  const {data, isLoading} = usersApi.useFetchPhotosQuery({page})
  const {responseData, totalPages} = {...data}

  const {data: album} = usersApi.useFetchAlbumsQuery({})

  console.log('Gallery')
  useEffect(() => {
    dispatch(setLoading(isLoading))
  }, [dispatch, isLoading, responseData])

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Grid
        container
        spacing={{xs: 4, md: 6}}
        justifyContent="center"
        alignItems="self-start"
        paddingTop={6}
        paddingBottom={6}>
        {responseData && responseData.map(photo => (
          <Grid item key={photo.id}>
            <Card sx={{maxWidth: 200}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.thumbnailUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {album ? album.filter(item => item.id === photo.albumId)[0].title : photo.albumId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {photo.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {totalPages && totalPages > 0 ?
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}/> : null}
      </Grid>
    </>
  )
}
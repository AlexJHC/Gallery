import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {CardActionArea, CardMedia, Dialog, DialogActions, DialogContent} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import {AlbumType, PhotoType} from '../../../api/usersApi';

type PropsGalleryCardType = {
  albums: AlbumType[] | undefined
  responseData: PhotoType[] | undefined
}

export default function GalleryCard({albums, responseData}: PropsGalleryCardType) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log('GalleryCard')
  return (
    <>
      {responseData &&
        responseData.map(photo => (
          <Grid item key={photo.id}>
            <Card
              sx={{maxWidth: 200}}
              onClick={handleClickOpen}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.thumbnailUrl}
                  alt={photo.title}
                  loading='lazy'/>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div">
                    {albums
                      ? albums.filter(album =>
                        album.id === photo.albumId)[0].title
                      : photo.albumId}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary">
                    {photo.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Dialog
              fullWidth={false}
              maxWidth='xl'
              open={open}
              onClose={handleClose}>
              <DialogContent>
                <Box
                  component="img"
                  sx={{
                    maxHeight: {xs: 250, md: 350, xl: 600},
                    maxWidth: {xs: 250, md: 350, xl: 600},
                  }}
                  alt={photo.title}
                  src={photo.url}
                  loading='lazy'
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        ))}
    </>
  )
}
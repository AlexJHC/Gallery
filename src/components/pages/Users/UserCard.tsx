import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type AreaCardPropsType = {
  username: string
  name: string
  companyName: string
  website: string
  phone: string
  email: string
  location: {
    "lat": string
    "lng": string
  }
}

export default React.memo( function UserCard(
  {
    username,
    name,
    companyName,
    website,
    phone,
    email,
    location,
  }: AreaCardPropsType) {

  const mapPath =
    `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=2&output=embed`

  return (
    <Card sx={{maxWidth: 370}}>
      <iframe
        title={`${username} google map location`}
        src={mapPath}
        width="300"
        height="350"
        loading='lazy'
        frameBorder="0">
      </iframe>
      <CardContent>
        <Typography
          gutterBottom variant="h5"
          component="div">
          {username}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary">
          {name} <br/>
          {companyName} <br/>
          {website} <br/>
          {phone} <br/>
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
})
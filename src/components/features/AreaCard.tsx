import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type AreaCardPropsType = {
  username: string
  name: string
  companyName: string
  website: string
  phone: string
  email: string
}

export default function AreaCard({username, name, companyName, website, phone, email}: AreaCardPropsType)  {

  return (
    <Card sx={{maxWidth: 370}}>
      <CardMedia
        component="img"
        height="300"
        width="350"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {website}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
}
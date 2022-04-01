import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {UserType} from '../../../api/dataApi';
import Grid from '@mui/material/Grid';

type AreaCardPropsType = {
  users: UserType[] | undefined
}

export default React.memo(function UserCard({users}: AreaCardPropsType) {

  return (<>
    {users && users.map(user =>
      <Grid item key={user.id}>
        <Card sx={{maxWidth: 370}}>
          <iframe
            title={`${user.username} google map location`}
            src={`https://maps.google.com/maps?q=
            ${user.address.geo.lat},
            ${user.address.geo.lng}&z=2&output=embed`}
            width="300"
            height="350"
            loading='lazy'
            frameBorder="0">
          </iframe>
          <CardContent>
            <Typography
              gutterBottom variant="h5"
              component="div">
              {user.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary">
              {user.name} <br/>
              {user.company.name} <br/>
              {user.website} <br/>
              {user.phone} <br/>
              {user.email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )}
  </>)
})
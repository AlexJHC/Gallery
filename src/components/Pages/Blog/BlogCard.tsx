import Grid from '@mui/material/Grid';
import React from 'react';
import {PostType, UserType} from '../../../api/usersApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type PropsBlogCardType = {
  responseData: PostType[] | undefined
  usersResponse: UserType[] | undefined
}

export default React.memo(function BlogCard({
                                              responseData,
                                              usersResponse
                                            }: PropsBlogCardType) {
  return (
    <>
      {responseData &&
        responseData.map(post =>
          <Grid item key={post.id}>
            <Card sx={{maxWidth: 345}}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
                <hr/>
                <Typography gutterBottom component="div">
                  {usersResponse
                    ? usersResponse.filter(user =>
                      user.id === post.userId)[0].username
                    : post.userId} <br/> userId: {post.userId}
                </Typography>
              </CardContent>
            </Card>
          </Grid>)}
    </>
  )
})
import Box from '@mui/material/Box';
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box sx={{width: '100%', color: 'black'}}>
      <LinearProgress color={'inherit'}/>
    </Box>
  )
}
import {Alert, Snackbar} from '@mui/material';
import React from 'react';

type PropsErrorType = {
  isError: boolean
  handleError: (error: boolean) => void
}

export default React.memo(function Error({isError, handleError}: PropsErrorType) {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleError(false);
  };

  return (
    <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
        Oops! Network Error Please Try Again Later
      </Alert>
    </Snackbar>
  );
})
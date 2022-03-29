import React from 'react';
import AppRoutes from "./components/features/Routes/AppRoutes";
import NavBar from './components/features/NavBar/NavBar';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store/store';
import Loading from './components/features/Loading/Loading';
import Error from './components/features/Alert/Error';
import {initialAppStateType, setError} from './store/slice/appSlice';

function App() {

  const dispatch = useDispatch()

  const {isLoading, isError} = useSelector<RootState, initialAppStateType>(state => state.app)

  const handleError = (error: boolean) => {
    dispatch(setError(error))
  }

  return (
    <>
      {isLoading && <Loading/>}
      <Error
        isError={isError}
        handleError={handleError}/>
      <NavBar/>
      <AppRoutes/>
    </>
  );
}

export default App;

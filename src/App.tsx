import React from 'react';
import AppRoutes from "./components/features/Routes/AppRoutes";
import NavBar from './components/features/NavBar/NavBar';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import Loading from './components/features/Loading/Loading';

function App() {

  const isLoading = useSelector<RootState, boolean>(state => state.app.isLoading)

  return (
    <>
      {isLoading && <Loading/>}
      <NavBar/>
      <AppRoutes/>
    </>
  );
}

export default App;

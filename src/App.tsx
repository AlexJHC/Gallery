import React from 'react';
import './App.css';
import AppRoutes from "./components/AppRoutes";
import Loading from './components/Pages/Loading/Loading';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';

function App() {
  const loading = useSelector<RootState, boolean>(state => state.app.isLoading)

  return (
    <>
      <AppRoutes/>
      {loading && <Loading/>}
    </>
  );
}

export default App;

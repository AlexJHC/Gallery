import {Navigate, Route, Routes} from 'react-router-dom';
import Blog from '../../pages/Blog/Blog';
import Gallery from '../../pages/Gallery/Gallery';
import React from 'react';
import Users from '../../pages/Users/Users';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Blog/>}/>
      <Route path='gallery' element={<Gallery/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path={'*'} element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}
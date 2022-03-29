import {Navigate, Route, Routes} from 'react-router-dom';
import Blog from '../../Pages/Blog/Blog';
import Gallery from '../../Pages/Gallery/Gallery';
import React from 'react';
import Users from '../../Pages/Users/Users';

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
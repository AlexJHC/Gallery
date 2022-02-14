import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Users";
import Blog from "./Pages/Blog/Blog";
import Gallery from "./Pages/Gallery/Gallery";
import Users from "./Pages/Home/Users";
import React from "react";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="blog" element={<Blog/>}/>
      <Route path="gallery" element={<Gallery/>}/>
      <Route path="gallery" element={<Users/>}/>
      <Route path={"*"} element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}
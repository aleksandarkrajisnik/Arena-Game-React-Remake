import React, {useState, useEffect, useRef} from 'react';
import Login from "./pages/Login/Login";
import { Routes, Route } from 'react-router';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
  )
}

export default App;

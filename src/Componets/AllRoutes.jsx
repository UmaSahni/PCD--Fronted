import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Form from './Form';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/form" element={<Form/>} />
    </Routes>
  );
}

export default AllRoutes;

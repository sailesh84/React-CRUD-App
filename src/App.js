import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavBar from './components/NavBar';
import CreateFrm from './components/CreateFrm';
import ReadFrm from './components/ReadFrm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditFrm from './components/EditFrm';

export default function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<CreateFrm />} />
          <Route path="/read" exact element={<ReadFrm />} />
          <Route path="/edit/:id" exact element={<EditFrm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
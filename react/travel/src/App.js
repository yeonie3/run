import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Planner from './components/planner/Planner';
import Traffic from './components/traffic/Traffic';
import Confirm from './components/confirm/Confirm'
import IdContextProvider from './components/Context';

function App() {

  return (
    <IdContextProvider>
    <Routes>
      <Route path="/traffic" element={<Traffic />} />
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
    </IdContextProvider>

  );
}

export default App;

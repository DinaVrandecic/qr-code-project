import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import BusinessInfoSystems from './subjects/BusinessInfoSystems/BusinessInfoSystems';
import Grid from './subjects/Grid/Grid';
import Urs from './subjects/Urs/Urs';
import Multimedija from './subjects/Multimedija/Multimedija';
import Medicinski from './subjects/Medicinski/Medicinski';
import Paralelno from './subjects/Paralelno/Paralelno';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business-info-systems" element={<BusinessInfoSystems />} />  {/* Dodano */}
        <Route path="/grid-computer-systems" element={<Grid />} />  {/* Dodano */}
        <Route path="/urs" element={<Urs />} />  {/* Dodano */}
        <Route path="/multimedija" element={<Multimedija />} />  {/* Dodano */}
        <Route path="/medicinski" element={<Medicinski />} />  {/* Dodano */}
        <Route path="/paralelno" element={<Paralelno />} />  {/* Dodano */}
      </Routes>
    </Router>
  );
};

export default App;
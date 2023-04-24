import React from 'react'
import './App.css';
import Navi from './layouts/Navi';
import Dashboard from './layouts/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/src/collapse.js";

function App() {
  return (
    <div className="App">
      <Navi />
      <Dashboard />
    </div>
  );
}

export default App;

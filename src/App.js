import {BrowserRouter} from 'react-router-dom'
import MainRouter from './MainRouter'
import React from 'react';

const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
);

export default App;

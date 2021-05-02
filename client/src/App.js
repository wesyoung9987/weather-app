import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from './components/Header';
import Cities from './components/Cities';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      <div className="router-container">
        <Switch>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/">
            <Cities />
          </Route>
          <Redirect to='/' />
        </Switch>
      </div>
    </div>
  );
}

export default App;

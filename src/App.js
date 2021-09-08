// import logo from './logo.svg';
import './App.css';
import React, {Component, useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RenderSyllabus from './RenderSyllabus';
import Login from './Login';

function App() {
  return (
  <div className="wrapper">
    <h1 id="header">Application</h1>
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/RenderSyllabus">
                <RenderSyllabus />
              </Route>
              <Route path="/Login">
                <Login />
              </Route>
          </Switch>
      </BrowserRouter>
  </div>
  );
}
export default App;
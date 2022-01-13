import Main from './components/MainComponent';
import './App.css';
import React, {useState} from 'react';
import { Component } from 'react/cjs/react.production.min';
import {BrowserRouter} from 'react-router-dom';

class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    );
  }  

}
  
  


export default App;

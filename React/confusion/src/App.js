import logo from './logo.svg';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import {DISHES} from './shared/dishes';
import React, {useState} from 'react';

function App() {
  
  const [dishes, setDishes] = useState(DISHES);
  
  return (
    
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Ristorant Con Fusion
          </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={dishes}/>
    </div>
  );
}


export default App;

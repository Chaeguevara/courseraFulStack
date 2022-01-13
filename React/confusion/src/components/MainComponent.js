import Menu from './MenuComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import {Routes, Route, Navigate} from 'react-router-dom';
import { Nav } from 'reactstrap';


class Main extends Component {
  
  
    constructor(props){
        super(props);

        this.state={
            dishes: DISHES,
        };
    }


    render() {
        
        const HomePage = () =>{
            return(
                <Home />
            );
        }
        return (
    
            <div>
              <Header />
              <Routes>
                  <Route path="/home" element={<HomePage/>} />
                  <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
                  <Route path="*" element={<Navigate to="/home" />}/>
              </Routes>
              <Footer/>
            </div>
          );
    }

}


export default Main;

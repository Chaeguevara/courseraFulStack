import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {DISHES} from '../shared/dishes';
import {Routes, Route, Navigate, useParams} from 'react-router-dom';
import { Nav } from 'reactstrap';


class Main extends Component {
  
    
    constructor(props){
        super(props);

        this.state={
            dishes: DISHES,
            commnets : COMMENTS,
            promotions : PROMOTIONS,
            leaders : LEADERS
        };
    }


    render() {
        
        const HomePage = () =>{
            return(
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader ={this.state.leaders.filter((leader) => leader.featured)[0]} 
                />
            );
        }

        
        const DishWithId = ({match}) => {
            console.log("dish With Id");
            const {id} = useParams();

            console.log(id);

            console.log(
                this.state.dishes.filter((dish) => dish.id === Number(id))[0]
            )
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === Number(id))[0]} 
                    commnets={this.state.commnets.filter((comment) => comment.dishId === Number(id))[0]}
                />
            );
        }

        return (
    
            <div>
              <Header />
              <Routes>
                  <Route path="/home" element={<HomePage/>} />
                  <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} /> // order matters
                  <Route path="/menu/:dishId" element={<DishDetail dishes={this.state.dishes} comments={this.state.commnets} />} />
                  <Route exact path="/contactus" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/home" />}/>
              </Routes>
              <Footer/>
            </div>
          );
    }

}


export default Main;

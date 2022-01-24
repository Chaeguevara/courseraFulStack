import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import {Routes, Route, Navigate, useParams, 
        useLocation, useNavigate} from 'react-router-dom';
import { Nav } from 'reactstrap';
import About from './AboutComponent';
import {connect} from 'react-redux';



const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        commnets : state.commnets,
        promotions : state.promotions,
        leaders : state.leaders
    }        
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }


class Main extends Component {
  
    
    constructor(props){
        super(props);

      
    }


    render() {
        
        const HomePage = () =>{
            return(
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader ={this.props.leaders.filter((leader) => leader.featured)[0]} 
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
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === Number(id))[0]} 
                    commnets={this.props.commnets.filter((comment) => comment.dishId === Number(id))[0]}
                />
            );
        }

        return (
    
            <div>
              <Header />
              <Routes>
                  <Route path="/home" element={<HomePage/>} />
                  <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} /> // order matters
                  <Route path="/menu/:dishId" element={<DishDetail dishes={this.props.dishes} comments={this.props.commnets} />} />
                  <Route exact path="/aboutus" element={<About leaders={this.props.leaders} />}/>
                  <Route exact path="/contactus" element={<Contact/>} />
                  <Route path="*" element={<Navigate to="/home" />}/>
              </Routes>
              <Footer/>
            </div>
          );
    }

}


export default withRouter(connect(mapStateToProps)(Main));

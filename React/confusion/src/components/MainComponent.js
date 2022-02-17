import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import React, { Component } from 'react';
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import {Routes, Route, Navigate, useParams, 
        useLocation, useNavigate} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';
import { postFeedback,postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments : state.comments,
        promotions : state.promotions,
        leaders : state.leaders
    }        
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())}

});

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
        // this.props.fetchDishes();
        // this.props.resetFeedbackForm();
        // this.props.fetchComments();
        // this.props.fetchPromos();
        // this.props.fetchLeaders();
        console.log("constructor");

    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.resetFeedbackForm();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        console.log("Did mount");

    }


    render() {
        console.log(this.props);
        const HomePage = () =>{
            return(
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader ={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading = {this.props.leaders.isLoading}
                leadersErrMess = {this.props.leaders.errMess} 

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
              <TransitionGroup>
                <CSSTransition key={this.props.router.location.key} classNames="page" timeout={300}>
                    <Routes location={this.props.router.location}>
                        <Route path="/home" element={<HomePage/>} />
                        <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} /> // order matters
                        <Route path="/menu/:dishId" element={<DishDetail dishes={this.props.dishes.dishes} 
                                                                        isLoading={this.props.dishes.isLoading}
                                                                        errMess={this.props.dishes.errMess}
                                                                        comments={this.props.comments.comments} 
                                                                        commentsErrMess={this.props.comments.errMess}
                                                                        postComment={this.props.postComment} />} />
                        <Route exact path="/aboutus" element={<About leaders={this.props.leaders.leaders} />}/>
                        <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                                            postFeedback={this.props.postFeedback}/>} />
                        <Route path="*" element={<Navigate to="/home" />}/>
                    </Routes>
                </CSSTransition>
              </TransitionGroup>
              <Footer/>
            </div>
          );
    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

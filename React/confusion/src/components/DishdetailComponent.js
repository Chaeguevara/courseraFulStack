import React,{Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,
        Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Button} from 'reactstrap';
import {Link, useParams} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form';
   


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


      }

      toggleModal(){
          this.setState({
              isModalOpen : !this.state.isModalOpen
          })
      }

      handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


      render () {
          


        return(
            <div className="container">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>  
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}>
                                    
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required, ',
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </FormGroup>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>

                        </LocalForm>
                    </ModalBody>
                </Modal>


            </div>
            
        )
      }

}

    function RenderDish({dish}){
        
            return(
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>    
            );
        
    }

    function RenderComments({comments, addComment, dishId}){
        console.log(comments);
        if(comments !=null){
            const menuComment = comments.map((comment)=>{
                console.log(comment.rating);
                return(
                    <div key={comment.id}>
                        <div className="m-1">
                            {comment.comment}                        
                        </div>
                        <div className="m-1">
                            --{comment.author}, {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}                        
                        </div>
                    </div>
                );

            });
            return(
                <div className="col-12">
                    <h4>Comment</h4>
                    <div>
                        {menuComment}
                    </div>
                    <CommentForm addComment={addComment}
                        dishId={dishId}/>
                </div>

            );
 
        }else{
            return(
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        let {dishId} = useParams();
        if(props == null){
            return(
                <div></div>
            );
        }
        console.log(dishId);
        console.log(props);
        console.log(props.dishes);
        const dish = props.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0];
        const comment = props.comments.filter((c) => c.dishId === parseInt(dishId,10));
        console.log(comment);
        console.log(dish);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comment} 
                        addComment={props.addComment}
                        dishId={dish.id} />
                       

                    </div>
                </div>
            </div>
         )


    }

export default DishDetail;
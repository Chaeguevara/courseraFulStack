import React,{Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state ={
            selectedDish: null
        }
    }
    componentDidMount(){

    }

    componentWillUnmount(){
        
    }

    renderDetail(dish){
        if (dish != null){
            return(
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>    
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    renderComments(dish){
        if(dish !=null){
            
            const comments = dish.comments.map((comment)=>{
                return(
                    <div key={comment.id}>
                        <div className="m-1">
                            {comment.comment}                        
                        </div>
                        <div className="m-1">
                            --{comment.author}, {comment.date}                        
                        </div>
                        
                    </div>
                );

            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comment</h4>
                    <div>
                        {comments}
                    </div>
                </div>

            );
 
        }else{
            return(
                <div></div>
            );
        }
    }

    render(){
        console.log("DishDetailComponent");
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDetail(this.props.dish)}
                </div>
                {this.renderComments(this.props.dish)}
            </div>
        );

    }
}

export default DishDetail;
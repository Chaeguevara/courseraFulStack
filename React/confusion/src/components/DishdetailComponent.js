import React,{Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

   

    function RenderDetail({dish}){
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

    function RenderComments({dish}){
        if(dish !=null){
            
            const comments = dish.comments.map((comment)=>{
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

    const DishDetail = (props) => {
        console.log("DishDetailComponent render invoked");
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDetail dish = {props.dish} />
                    </div>
                    <RenderComments dish = {props.dish} />
                </div>
            </div>
        );

    }


export default DishDetail;
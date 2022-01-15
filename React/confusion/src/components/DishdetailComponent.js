import React,{Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link, useParams} from 'react-router-dom'
   

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

    function RenderComments({comments}){
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
                <div className="col-12 col-md-5 m-1">
                    <h4>Comment</h4>
                    <div>
                        {menuComment}
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
                        <RenderComments comments={comment} />
                    </div>
                </div>
            </div>
         )


    }

export default DishDetail;
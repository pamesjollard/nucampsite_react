import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

const dateFormatter = (date) => (
    new Intl.DateTimeFormat('en-US', {
         year: 'numeric', 
         month: 'short', 
         day: '2-digit',
        }).format(new Date(Date.parse(date)))
);



export default class CampsiteInfoComponent extends Component {
    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                       <CardTitle>{campsite.name}</CardTitle>
                       <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }


    renderComments(comments) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map((comment) => ( 
                        <div key={comment.id}>
                            <p className="m-0">{comment.text}</p>
                            <p>
                              {comment.author} - {dateFormatter(comment.date)}
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
    }

    render() {

        console.log(this.props.campsite);

        if (this.props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            ); 
        }

        return (
            <div></div>
        );  
    }
}




import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


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
        )
    }

    render() {

        console.log(this.props.campsite);

        if (this.props.campsite) {
            return (
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                </div>
            );
        }
        return (
            <div>
                
            </div>
        );
    }
}




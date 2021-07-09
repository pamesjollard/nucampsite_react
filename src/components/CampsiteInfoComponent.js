import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

const dateFormatter = (date) => (
    new Intl.DateTimeFormat('en-US', {
         year: 'numeric', 
         month: 'short', 
         day: '2-digit',
        }).format(new Date(Date.parse(date)))
);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit A Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <FormGroup>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" id="rating" 
                                            className="form-control">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                </div>    
                            </FormGroup>
                            <FormGroup>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" name="author" id="author" 
                                            className="form-control" placeholder="Your Name"
                                            validators={{
                                                required,
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be at least 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                        />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-group">
                                    <Label htmlFor="text">Comment</Label>
                                        <Control.textarea model=".text" name="text" id="text" 
                                        rows="6"  className="form-control"
                                        />
                                </div>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>   
            </React.Fragment>
        );
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody> 
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, campsiteId}) {
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
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
}

function CampsiteInfoComponent(props) {

    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }

    return (
        <div></div>
    );  
}

export default CampsiteInfoComponent;
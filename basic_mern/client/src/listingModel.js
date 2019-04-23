import React from 'react'
import Axios from 'axios';
import {Container, Button, Row, Col, Image, Modal, Form} from 'react-bootstrap'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ListingModel extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            listing: [],
            show: false,
            user: "",
        }
    }

    findListing = () => {
        Axios.get('/find_listing/' + this.props.match.params.id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteListing = (user) => {
        if(this.validUser(user)){
        Axios.get('/delete_listing/' + this.props.match.params.id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }
    else {
        console.log("invalid user")
    }
}

    validUser = (user) => {
        Axios.get('/find_user/' + this.state.user)
        .then((res) => this.setState({potential: res.data}))
        .catch(function (error) {
            console.log(error);
        })
        return (this.state.potential)
    }

handleClose() {
        this.setState({ show: false });
      }
    
handleShow() {
        this.setState({ show: true });
      }

    render(){
        return(
            <div>
                      <style type='text/css'>
      {`
      body {
    background-color: #90caf9;
}

.row {
    background-color: white;
    border-style: solid;
    border-color: #90caf9;
    padding: 25px;
}`}
</style>
                {this.findListing()}
                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Take Job</Modal.Title>
                                    </Modal.Header>
                                     <Modal.Body>
                                        <Form>
                                            <Form.Group controlID="username">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="user" onChange={(e) => this.setState({ user: e.target.value })} placeholder="Enter name"/>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                     <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => this.deleteListing(this.state.user)}>
                                        Take
                                     </Button>
                                            </Modal.Footer>
                                </Modal>
                {this.state.listing.name == "CastError"
                    ? 
                    <Container>
                        <Row lg={true}>
                            <Col lg={5}></Col>
                            <Col>
                                <h3>Page not Found</h3>
                            </Col>
                        </Row>
                    </Container>
                    : 
                    <Container>
                        <Row>
                            <Col lg={5}>
                                <Image src={"/find_image/" + this.props.match.params.id} class = "img-responsive" width = "100%"/>
                            </Col>
                            <Col lg={true}>
                                <h2>{this.state.listing.title}&nbsp;&nbsp;&nbsp;<Button variant="info" onClick={this.handleShow}>Take Job</Button></h2>
                                <h6>Posted by {this.state.listing.user}</h6>
                                <p>{this.state.listing.description}</p>
                                <p><i>Posted on {this.state.listing.date}</i></p>
                                <Map google={this.props.google} zoom={14}>
                                    <Marker onClick={this.onMarkerClick}
                                        name={'Current location'} />
                                    <InfoWindow onClose={this.onInfoWindowClose}>
                                        <div>
                                            {/* <h1>{this.state.selectedPlace.name}</h1> */}
                                        </div>
                                    </InfoWindow>
                                </Map>
                                <p>&nbsp;</p>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
  })(ListingModel)
import React from 'react'
import Axios from 'axios';
import {Container, Button, Row, Col, Image} from 'react-bootstrap'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ListingModel extends React.Component {

    findListing = () => {
        Axios.get('/find_listing/' + this.props.match.params.id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteListing = () => {
        Axios.get('/delete_listing/' + this.props.match.params.id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }

state = {
    listing: [],
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
                                <h2>{this.state.listing.title}&nbsp;&nbsp;&nbsp;<Button href={"/listing"} variant="info" onClick={() => this.deleteListing()}>Take Job</Button></h2>
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
                                <p><Button href={"/listing"} variant="info" onClick={() => this.deleteListing()}>Take Job</Button></p>
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
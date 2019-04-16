import React from 'react'
import Axios from 'axios';
import {Container, Button, Row, Col} from 'react-bootstrap'

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

     arrayBufferToBase64 = () => {
        let json = JSON.stringify(this.state.listing.image)
        console.log(JSON.parse(json))
    }


state = {
    listing: [],
}

    render(){
        return(
            <div>
                {this.findListing()}
                {this.state.listing.name == "CastError"
                    ? 
                    <Container>
                        <Row>
                            <Col xs={5}></Col>
                            <Col>
                                <h3>Page not Found</h3>
                            </Col>
                        </Row>
                    </Container>
                    : 
                    <Container>
                        <Row>
                            <Col xs={5}>
                                INSERT IMAGE
                                {this.arrayBufferToBase64()}
                            </Col>

                            <Col xs={7}>
                                <h2>{this.state.listing.title}</h2>
                                <h6>Posted by {this.state.listing.user}</h6>
                                <p>{this.state.listing.description}</p>
                            </Col>
                        </Row>
                        <Row>
                        <p><Button href={"/listing"} onClick={() => this.deleteListing()}>Take Job</Button></p>
                        </Row>
                    </Container>
                }
            </div>
        )
    }
}
export default ListingModel
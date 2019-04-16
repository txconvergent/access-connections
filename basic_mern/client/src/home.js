import React from 'react';
import axios from "axios";
import {Jumbotron,Image, Container, Button, Form, Row, Col, Collapse} from 'react-bootstrap'
class Home extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      open: false,
    };
  }

  render() {
    const{ open } = this.state;
    return(
      <div style= {{"z-index": "0", backgroundColor: "rgba(144, 202, 249, .6)"}}>
        <Jumbotron style= {styles.container }> 
          <div style={{backgroundColor: "rgba(255, 255, 255, 0.8)", width: "100%", height: "100%", position: "absolute", top: "0", left: "0", "z-index": "-1"}}></div>
          <Container style={{"z-index": "1"}}>
            <div style={{paddingTop: '150px', paddingBottom: '100px'}}>
              <Button variant= "link" href= "/about"  style={{fontWeight: "bold", fontSize: '80px', color: "#0062cc"}}>LinkD</Button>
              <p style={{fontSize: '20px', fontWeight: 'bold', paddingLeft: '19px'}}>
                We connect people to other people. 
              </p>
              <Row>
                <Col style={{paddingRight: '0px'}}>
                  <Form>
                    <Form.Group controlID = "listingSearchBar">
                      <Form.Control type = "listingSearch" placeholder="Search Listings" />
                    </Form.Group>
                  </Form>
                </Col>
                <Col style = {{paddingLeft: '2px'}}>
                  <Button variant = "primary" type = "submit" style={{marginLeft: "0px"}}>
                    Search
                  </Button>
                </Col>
              </Row>
              <Button large href="/about">About Us</Button>
              <Container style={{paddingTop: '25px'}}>
                <Row>
                   <Button href="/login">Log In</Button>
                    <Button style={{marginLeft: "50px"}}>Sign Up</Button>
                </Row>
              </Container>
            </div>
          </Container>
        </Jumbotron>
        <Container style={{textAlign: "center"}}>
          <Row>
            <Col>
              <Button 
                onClick ={() => this.setState({ open: !open})}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                How it works
              </Button>
            </Col>
          </Row>
          <Row style = {{paddingTop: '50px'}}>
            <Collapse in={this.state.open}>
              <div id="home-collapse-text" style= {{margin: "auto"}}>
                <p>
                  THIS NEEDS TO BE FILLED IN WITH A DESCRIPTION OF CONNECTMENOW
                </p>
              </div>
            </Collapse>
          </Row>
        </Container>
      </div>
    )
  }
}

const backgroundImage = "http://worldartsme.com/images/people-helping-people-clipart-1.jpg"

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    position: "relative",
    "z-index": "1"
  }
};


export default Home


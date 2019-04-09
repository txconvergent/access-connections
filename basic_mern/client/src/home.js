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
      <div>
        <Jumbotron style= {styles.container}/*{backgroundColor: '#90caf9'}}>*/> 
          <Container>
            <div style={{paddingTop: '150px', paddingBottom: '100px'}}>
              <h1>ConnectMeNow</h1>
              <p>
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
                   <Button>Log In</Button>
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
              <div id="home-collapse-text">
                <p style = {{textAlign: "center"}}>
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

const backgroundImage = "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"


const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    opacity: 0.3
  }
};


export default Home


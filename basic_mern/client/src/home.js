import React from 'react';
import axios from "axios";
import {Jumbotron, Container, Button, Row, Col} from 'react-bootstrap'

class Home extends React.Component {

  render() {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#90caf9'}}>
          <Container>
            <div style={{paddingTop: '150px', paddingBottom: '100px'}}>
              <h1>ConnectMeNow</h1>
              <p>
                We connect people to other people. 
              </p>
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
          <h1>How it works</h1>
          <p>Lorem Ipsum Dolor latin </p>
        </Container>
      </div>
    )
  }
}

export default Home

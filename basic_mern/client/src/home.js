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
              <Button variant= "link" href= "/about"  style={{fontWeight: "bold", fontSize: '80px', color: "#0062cc"}}>Ally</Button>
              <p style={{fontSize: '20px', fontWeight: 'bold', paddingLeft: '19px'}}>
                Connecting people in need. 
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
            </div>
          </Container>
        </Jumbotron>
        <Container>
          <Row style = {{textAlign: "center", fontWeight: "bold", fontSize: '30px', color: "#0062cc"}}>
                <p>“To assist people with disabilities by linking them to the volunteers that they need”</p>
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


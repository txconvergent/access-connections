import React from 'react'
import Axios from 'axios';
import {Form, Modal,Container, Button, Row, Col} from 'react-bootstrap'
class Listing extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    uniqueTitle = (title) => {
      var unique = true
      this.state.data.forEach(obj => {
        if(obj.title == title){
          unique = false
        }
      })
      return unique
    }

    getDataFromDB = () => {
        fetch('/get_listing')
          .then((data) => data.json())
          .then((res) => this.setState({data: res.data}))

    }


    this.state = {
      data: [],
      show: false,
    };
  }

  uniqueTitle = (title) => {
    var unique = true
    this.state.data.forEach(obj => {
      if(obj.title == title){
        unique = false
      }
    })
    return unique
  }

  getDataFromDB = () => {
      fetch('/get_listing')
        .then((data) => data.json())
        .then((res) => this.setState({data: res.data}))
  }


  writeListingToDB = (user, title, number) => {
    if (this.uniqueTitle(title)){
      Axios.post('/write_listing', {
          user: user,
          title: title,
          number: number
      })
      .then(() => this.getDataFromDB())
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  
  render() {
    return(
    <div>
      {this.getDataFromDB()}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Post a listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row>
            <Col xs={3}><h1><b>Listings</b></h1></Col>
            <Col xs={7}></Col>
            <Col cs={1}><Button variant="info" onClick={this.handleShow}>
            Post a listing
            </Button></Col>
          </Row>
          {this.state.data.length <= 0
            ? "No listings yet."
            : this.state.data.map(dat => (
              <div>
                <Row>
                <Col xs={3}>(INSERT IMG)</Col>
                <Col xs={9}>
                  <h3><a href={"/listing/" + dat._id}>{dat.title}</a></h3>
                  <p>{dat._id}</p>
                </Col>
              </Row>
            </div>
          ))}
      </Container>
      <div style={{padding: "10px"}}>
        <input type="text" onChange={(e) => this.setState({ user: e.target.value })}
          placeholder="User" style={{width: "200px"}}/>
      </div>
      <div style={{padding: "10px"}}>
        <input type="text" onChange={(e) => this.setState({ title: e.target.value })}
          placeholder="Title" style={{width: "200px"}}/>
      </div>
      <div style={{padding: "10px"}}>
        <button onClick={() => this.writeListingToDB(this.state.user, this.state.title, this.state.data.length)}>Submit</button>
      </div>
    </div>
    )
  }
}
export default Listing
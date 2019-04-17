import React from 'react'
import Axios from 'axios';
import {Form, Modal,Container, Button, Row, Col, Media, Image} from 'react-bootstrap'
class Listing extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

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

  writeListingToDB = (user, title, number, description, image) => {
    this.handleClose()
    // var imgPath = document.getElementById("file-id").files[0].path
    console.log(image)
    {
        Axios.post('/write_listing', {
            user: user,
            title: title,
            number: number,
            description: description,
            image: image
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
              <Form.Group controlID="jobTitle">
                <Form.Label>Name</Form.Label>
                <Form.Control type="user" onChange={(e) => this.setState({ user: e.target.value })} 
                placeholder="Enter name"/>
              </Form.Group>
              <Form.Group controlID="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="title" onChange={(e) => this.setState({ title: e.target.value })} 
                placeholder="Enter job title"/>
              </Form.Group>
              <Form.Group controlID="jobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control type="description" onChange={(e) => this.setState({ description: e.target.value })} 
                placeholder="Enter description"/>
              </Form.Group>
              <Form.Group controlID="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" class="custom-file-input" id="customFile" accept=".jpg,.gif,.png" 
                onChange={(e) => this.setState({ image: e.target.value })} ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.writeListingToDB(this.state.user, this.state.title, this.state.data.length, this.state.description, this.state.image)}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row>
            <Col xs={3}><h1>Listings</h1></Col>
            <Col xs={7}></Col>
            <Col cs={1}><Button variant="info" onClick={this.handleShow}>
            Post a listing
            </Button></Col>
          </Row>
          {this.state.data.map(dat => (
            <>
              <Row>
                <Col xs={3}>
                (INSERT IMG)
                <Image src={"/find_image/" + dat._id} fluid/>
                </Col>
                <Col xs={9}>
                  <h4><a href={"/listing/" + dat._id}>{dat.title}</a></h4>
                  <h6>Posted by {dat.user}</h6>
                  <p>{dat.description}</p>
                </Col>
              </Row>
            </>
          ))}
      </Container>
    </div>
    )
  }
}
export default Listing
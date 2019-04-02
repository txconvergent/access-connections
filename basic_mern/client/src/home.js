import React from 'react';
import axios from "axios";

class Home extends React.Component {
  getDataFromDB = () => {
    fetch('/get_data')
      .then((data) => data.json())
      .then((res) => this.setState({data: res.data}))
  }

  writeDataToDB = (message) => {
    axios.post('/write_data', {message: message})
      .then(() => this.getDataFromDB())
  }

  deleteDataFromDB = (id) => {
    axios.delete('/delete_data', {data: {id: id}})
      .then(() => this.getDataFromDB())
  }
  
  state = {
    data: [],
    message: null
  }

  componentDidMount() {
    this.getDataFromDB()
  }

  render() {
    return(
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Volunteer Connections</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <ul>
            {this.state.data.length <= 0
              ? "No entries in database yet."
              : this.state.data.map(dat => (
                <li style={{padding: "10px"}} key={dat._id}>
                  <span style={{color: "gray"}}> id: </span> {dat._id} <br/>
                  <span style={{color: "gray"}}> data: </span> {dat.message}
                  <span style={{color: "gray"}}> user: </span> {dat.user}
                  <span style={{color: "gray"}}> pass: </span> {dat.pass}
                </li>
              ))}
          </ul>
        </div>
        <div style={{padding: "10px"}}>
          <input type="text" onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database" style={{width: "200px"}}/>
          <button onClick={() => this.writeDataToDB(this.state.message)}>add</button>
        </div>
        <div>
          <input type="text" onChange={(e) => this.setState({ id: e.target.value })}
            placeholder="delete something in the database" style={{width: "200px"}}/>
          <button onClick={() => this.deleteDataFromDB(this.state.id)}>delete</button>
        </div>
        <div style={{padding: "10px"}}>
          <button onClick={() => this.getDataFromDB()}>load</button>
        </div>
      </div>
    )
  }
}

export default Home

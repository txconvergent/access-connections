import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
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
        <div>
          <ul>
            {this.state.data.length <= 0
              ? "No entries in database yet."
              : this.state.data.map(dat => (
                <li style={{padding: "10px"}} key={this.state.data.message}>
                  <span style={{color: "gray"}}> id: </span> {dat._id} <br/>
                  <span style={{color: "gray"}}> data: </span> {dat.message}
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

export default App;
import React from 'react'
import Axios from 'axios';
class Login extends React.Component {

    getDataFromDB = () => {
        fetch('/get_data')
          .then((data) => data.json())
          .then((res) => this.setState({data: res.data}))
      }


    writeUserToDB = (user, pass) => {
        Axios.post('/write_user', {
            user: user,
            pass: pass
        })
        .then(() => this.getDataFromDB())
        console.log(user, pass)
    }

state = {
    data: [],
    user: null,
    pass: null

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
              <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
              </li>
              <li class="nav-item active">
              <a class="nav-link" href="/login">Login <span class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
      <h1>Login</h1>
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
      <div style={{padding: "10px"}}>
        <input type="text" onChange={(e) => this.setState({ user: e.target.value })}
          placeholder="Username" style={{width: "200px"}}/>
      </div>
      <div>
        <input type="text" onChange={(e) => this.setState({ pass: e.target.value })}
          placeholder="Password" style={{width: "200px"}}/>
      </div>
      <div style={{padding: "10px"}}>
        <button onClick={() => this.writeUserToDB(this.state.user, this.state.pass)}>Submit</button>
      </div>
    </div>
    )
  }
}
export default Login
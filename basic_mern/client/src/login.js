import React from 'react'
class Login extends React.Component {


  
  render() {
    return(
    <div>
      <h1>Login</h1>
      <div style={{padding: "10px"}}>
        <input type="text" onChange={(e) => this.setState({ message: e.target.value })}
          placeholder="Username" style={{width: "200px"}}/>
        <button onClick={() => this.writeDataToDB(this.state.message)}>add</button>
      </div>
      <div>
        <input type="text" onChange={(e) => this.setState({ id: e.target.value })}
          placeholder="Password" style={{width: "200px"}}/>
        <button onClick={() => this.deleteDataFromDB(this.state.id)}>delete</button>
      </div>
      <div style={{padding: "10px"}}>
        <button onClick={() => this.getDataFromDB()}>Submit</button>
      </div>
    </div>
    )
  }
}
export default Login
import React from 'react'
import Axios from 'axios';
class Listing extends React.Component {

    getDataFromDB = () => {
        fetch('/get_listing')
          .then((data) => data.json())
          .then((res) => this.setState({data: res.data}))
      }


    writeListingToDB = (user, title) => {
      console.log(user, title)
        Axios.post('/write_listing', {
            user: user,
            title: title
        })
        .then(() => this.getDataFromDB())
    }

state = {
    data: [],
    user: null,
    title: null,
    number: null

}
  
  render() {
    return(
    <div>
      <h1>Listing</h1>
      <ul>
            {this.state.data.length <= 0
              ? "No entries in database yet."
              : this.state.data.map(dat => (
                <li style={{padding: "10px"}} key={dat._id}>
                  <span style={{color: "gray"}}> id: </span> {dat._id} <br/>
                  <span style={{color: "gray"}}> user: </span> {dat.user}
                  <span style={{color: "gray"}}> title: </span> {dat.title}
                  <span style={{color: "gray"}}> number: </span> {dat.listingNumber}
                </li>
              ))}
          </ul>
      <div style={{padding: "10px"}}>
        <input type="text" onChange={(e) => this.setState({ user: e.target.value })}
          placeholder="User" style={{width: "200px"}}/>
      </div>
      <div>
        <input type="text" onChange={(e) => this.setState({ title: e.target.value })}
          placeholder="Title" style={{width: "200px"}}/>
      </div>
      <div style={{padding: "10px"}}>
        <button onClick={() => this.writeListingToDB(this.state.user, this.state.title)}>Submit</button>
      </div>
    </div>
    )
  }
}
export default Listing
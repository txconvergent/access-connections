import React from 'react'
import Axios from 'axios';

class ListingModel extends React.Component {

    findListing = (id) => {
        Axios.get('/find_listing/' + id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }


state = {
    listing: [],
}

    render(){
        return(
            <div>
                <h1></h1>
                <div style={{ padding: "10px" }}>
                    <input type="text" onChange={(e) => this.setState({ id: e.target.value })}
                        placeholder="id" style={{ width: "200px" }} />
                </div>
                <div style={{ padding: "10px" }}>
                    <button onClick={() => this.findListing(this.state.id)}>Submit</button>
                </div>

                <ul>
                    {this.state.listing.length <= 0
                        ? "No search results found"
                        : 
                        <div><h1>{this.state.listing.title}</h1>
                        <h2>{this.state.listing.user}</h2></div>
                        }
                </ul>
            </div>
        )
    }
}
export default ListingModel
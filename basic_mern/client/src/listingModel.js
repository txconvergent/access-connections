import React from 'react'
import Axios from 'axios';

class ListingModel extends React.Component {

    findListing = () => {
        Axios.get('/find_listing/' + this.props.match.params.id)
        .then((res) => this.setState({listing: res.data}))
        .catch(function (error) {
            console.log(error);
        })
    }

    deleteListing = () => {
        Axios.get('/delete_listing/' + this.props.match.params.id)
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
                {this.findListing()}
                <ul>
                    {this.state.listing.length <= 0
                        ? "Page not found"
                        : 
                        <div><h1>{this.state.listing.title}</h1>
                        <h2>{this.state.listing.user}</h2></div>
                        }
                     <div style={{padding: "10px"}}>
                    <button onClick={() => this.deleteListing()}>Take Job</button>
                    </div>
                </ul>
            </div>
        )
    }
}
export default ListingModel
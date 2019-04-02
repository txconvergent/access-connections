import React from 'react';
import FormContainer from './containers/FormContainer';

class Contact extends React.Component {
  render() {
    return(
    <div>
      <div className = "container">
      <h3>React Form</h3>
      <FormContainer />
      </div>
    </div>
    )
  }
}
export default Contact
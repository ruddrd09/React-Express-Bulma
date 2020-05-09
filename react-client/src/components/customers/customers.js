import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }

  componentDidMount() {
    fetch('/api')
    .then(res => res.json())
    .then(customers => this.setState({customers},() => console.log('customers fetched..', customers)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.customers.map(customer => 
            <li key={customer.id}>{customer.firstName} {customer.lastName}</li>  
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
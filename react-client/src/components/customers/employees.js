import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      assigned: [],
      available: [],
      id: null
    }
  }

  componentDidMount() {
    fetch('/employee')
    .then(res => res.json())
    .then(employees => this.setState({employees},() => console.log('employees fetched..', employees)))
    .catch(err => console.log(err));
  }

  submitTask = () => {
    const {available, assigned, id} = this.state;
    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available, assigned, id })
    };
    fetch('/editSurvey', requestBody)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));;
  }

  selectEmployee = (e) => {
    if(e.target.value === "Select an Employee") {
      this.setState({
        id: null,
        available: [],
        assigned: []
      })
    } else {
      this.state.employees.filter(employee => employee.id == e.target.value).map(task => {
        this.setState({
          id: task.id,
          available: task.surveyAvailable,
          assigned: task.surveyAssigned
        })
      })
    }
  }

  toAssigned = (emp) => {
    const {available, assigned} = this.state;
    const newAvailable = available.filter(val => val !== emp)
    this.setState({
      assigned: [...assigned, emp],
      available: newAvailable
    })
  }

  toAvailable = (emp) => {
    const {available, assigned} = this.state;
    const newAssigned = assigned.filter(val => val !== emp)
    this.setState({
      available: [...available, emp],
      assigned: newAssigned
    })
  }

  render() {
    const {available, assigned} = this.state;
    return (
      <div>
        <h2>Select Employee</h2>
        <select onChange={this.selectEmployee}>
          <option value="Select an Employee">Select an Employee</option>
          {this.state.employees.map(employee => 
            <option key={employee.id} value={employee.id}>{employee.name}</option>  
          )}
        </select>
        <form>
          <ul>
            <h2>Survey List</h2>
            {available ? available.map(emp => 
              <li key={emp}>
                <span>{emp}</span>
                <span onClick={this.toAssigned.bind(this,emp)}>Add</span>
              </li>
            ) : null}
          </ul>
          <ul>
            <h2>Assigned Surveys</h2>
            {assigned ? assigned.map(emp => 
              <li key={emp}>
                <span>{emp}</span>
                <span onClick={this.toAvailable.bind(this,emp)}>Remove</span>
              </li>
            ) : null}
          </ul>
          <button type="submit" onClick={this.submitTask}>Done</button>
        </form>
      </div>
    );
  }
}

export default Employees;
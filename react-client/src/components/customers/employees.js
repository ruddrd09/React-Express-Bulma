import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../index'
import { GET_SURVEYS } from '../../actionTypes'
import './employees.css';

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      assigned: [],
      available: [],
      id: null
    }
  }

  componentDidMount() {
    fetch('/employee')
    .then(res => res.json())
    .then(employees => {
      store.dispatch({
        type: GET_SURVEYS,
        payload: employees
      });
    })
    .catch(err => console.log(err));
  }

  submitTask = (e) => {
    e.preventDefault();
    const {available, assigned, id} = this.state;
    if(id !== null) {
      const requestBody = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available, assigned, id })
      };
      fetch('/editSurvey', requestBody)
      .then(response => response.json())
      .then(employees => {
        store.dispatch({
          type: GET_SURVEYS,
          payload: employees
        });
      })
      .catch(err => console.log(err));;
    }
  }

  selectEmployee = (e) => {
    const { employees } = this.props;
    if(e.target.value === "Select an Employee") {
      this.setState({
        id: null,
        available: [],
        assigned: []
      })
    } else {
      employees.filter(employee => String(employee.id) === e.target.value).map(task => {
        this.setState({
          id: task.id,
          available: task.surveyAvailable,
          assigned: task.surveyAssigned
        })
        return null;
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
    const newAssigned = assigned.filter(val => val !== emp);
    this.setState({
      available: [...available, emp],
      assigned: newAssigned
    })
  }

  render() {
    const {available, assigned} = this.state;
    const { employees } = this.props;
    return (
      <div class="container">
        <h2 class="title has-text-centered">Survey Assignment System</h2>
        <div class="box has-text-centered">
          <div class="select is-info">
            <select onChange={this.selectEmployee}>
              <option value="Select an Employee">Select an Employee</option>
              {employees ? employees.map(employee => {
                console.log(employee);
                return <option key={employee.id} value={employee.id}>{employee.name}</option> 
              }  
              ) : null}
            </select>
          </div>
        </div>
        <form>
          <div class="columns">
            <div class="column">
              <div class="has-text-centered title is-4">Survey List</div>
                <table class="table is-bordered">
                  {available.length > 0 ? available.map(emp => 
                    <tr key={emp}>
                      <td>{emp}</td>
                      <td onClick={this.toAssigned.bind(this,emp)}>Add</td>
                    </tr>
                  ) : <tr class="subtitle is-4 has-text-centered">No Survey Available</tr>}
                </table>
            </div>
            <div class="column">
              <h2 class="has-text-centered title is-4">Assigned Surveys</h2>
              <table class="table is-bordered">
                {assigned.length > 0 ? assigned.map(emp => 
                  <tr key={emp}>
                    <td>{emp}</td>
                    <td>
                      <button class="delete" onClick={this.toAvailable.bind(this,emp)}></button>
                    </td>
                  </tr>
                ) : <tr class="subtitle is-4 has-text-centered">No Survey Assigned</tr>}
              </table>
            </div>
          </div>
          <div class="has-text-centered">
            <button class="button is-primary is-outlined is-rounded" type="submit" onClick={this.submitTask}>Done</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees
})

export default connect(mapStateToProps)(Employees);
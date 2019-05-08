import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      tides: {
        observe: [],
        predict: [],
        calculate: []
      }
    }
  }

  componentWillMount() {
    var date = new Date();
    this.setState({
      date: date
    });
    this.getTides('2017-01-01 12:12:32');
  }

  getTides(date) {
    var url_observe = "https://tide-api-ezaki-lab.herokuapp.com/observe"
    fetch(url_observe, {
      method: 'POST',
      body: JSON.stringify(date),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        this.setState({
          tides: {
            observe: response['tides']
          }
        });
      })
      .catch(error => console.error('Error:', error));

    var url_predict = "https://tide-api-ezaki-lab.herokuapp.com/predict"
    fetch(url_predict, {
      method: 'POST',
      body: JSON.stringify(date),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        this.setState({
          tides: {
            predict: response['tides']
          }
        });
      })
      .catch(error => console.error('Error:', error));

    var url_calculate = "https://tide-api-ezaki-lab.herokuapp.com/calculate"
    fetch(url_calculate, {
      method: 'POST',
      body: JSON.stringify(date),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        this.setState({
          tides: {
            calculate: response['tides']
          }
        });
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="App">
        <Chart date={this.state.date} tides={this.state.tides} />
      </div>
    );
  }
}

export default App;

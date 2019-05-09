import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      tides: {
        observe: null,
        predict: null,
        calculate: null
      }
    }
  }

  componentWillMount() {
    var date = new Date();
    this.setState({
      date: date
    });

    // this.setState({
    //   tides: {
    //     observe: [
    //       12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    //       12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    //     ],
    //     predict: [
    //       12, 12, 12, 12, 13, 12, 12, 12, 12, 12, 12, 12, 
    //       12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    //     ],
    //     calculate: [
    //       12, 12, 12, 12, 12, 5, 12, 12, 12, 12, 12, 12, 
    //       12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    //     ]
    //   }
    // })
  }

  componentDidMount() {
    this.getTides('2017-01-01 12:12:32');
  }

  getTides(date) {
    var url_observe = "https://tide-api-ezaki-lab.herokuapp.com/observe"
    fetch(url_observe, {
      method: 'POST',
      body: JSON.stringify({'date':date}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log("fetched observe tides", response['tides'])
        this.setState({
          tides: {
            observe: response['tides'],
            predict: this.state.tides.predict,
            calculate: this.state.tides.calculate
          }
        });
      })
      .catch(error => console.error('Error:', error));

    var url_predict = "https://tide-api-ezaki-lab.herokuapp.com/predict"
    fetch(url_predict, {
      method: 'POST',
      body: JSON.stringify({'date':date}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log("fetched predict tides", response['tides'])
        this.setState({
          tides: {
            observe: this.state.tides.observe,
            predict: response['tides'],
            calculate: this.state.tides.calculate
          }
        });
      })
      .catch(error => console.error('Error:', error));

    var url_calculate = "https://tide-api-ezaki-lab.herokuapp.com/calculate"
    fetch(url_calculate, {
      method: 'POST',
      body: JSON.stringify({'date':date}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log("fetched calculate tides", response['tides'])
        this.setState({
          tides: {
            observe: this.state.tides.observe,
            predict: this.state.tides.predict,
            calculate: response['tides']
          }
        });
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="App">
      {
        this.state.date && this.state.tides.observe && this.state.tides.predict && this.state.tides.calculate &&
        <Chart date={this.state.date} tides={this.state.tides} />
      }
      </div>
    );
  }
}

export default App;

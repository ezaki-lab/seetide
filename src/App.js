import React, { Component } from 'react';
import './App.css';
import STChart from './components/STChart/STChart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: null
    }
  }

  componentWillMount() {
    var date = new Date('2017-01-01');
    this.setState({
      date: date
    });
  }

  render() {
    return (
      <div className="App">
      <STChart date={this.state.date}/>
      </div>
    );
  }
}

export default App;

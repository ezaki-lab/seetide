import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      date:null
    }
  }

  componentWillMount(){
    var date = new Date('August 19, 1975 23:15:30');
    this.setState({
      date:date
    });
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
        </header> */}
        <Chart date={this.state.date} />
      </div>
    );
  }
  
}

export default App;

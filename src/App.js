import React, { Component } from 'react';
import './App.css';
import STChart from './components/STChart/STChart.js';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class App extends Component {
  constructor() {
    super();
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      date: null
    }
  }

  componentWillMount() {
    var today = new Date();
    this.setState({
      date: today
    });
  }

  handleDayChange(date) {
    this.setState({ date: date });
  }

  render() {
    return (
      <div className="App">
        <DayPickerInput
          onDayChange={this.handleDayChange}
          value={this.state.date}
          inputProps={{
            style: { 
              marginTop: 10,
              textAlign: 'center',
              fontSize: 25
             },
          }}
        />
        <STChart date={this.state.date} />
      </div>
    );
  }
}

export default App;

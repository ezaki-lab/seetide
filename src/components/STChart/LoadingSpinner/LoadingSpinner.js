import Spinner from 'react-spinner-material';
import React, { Component } from 'react';
import './LoadingSpinner.css';

export default class Example extends Component {
  render() {
  return (
      <div>
        <Spinner id="spinner_content" size={80} spinnerColor={"#8bbef3"} spinnerWidth={5} visible={true} />
      </div>
    );
  }
}

import React, { Component } from 'react'

import Chart from './Chart/Chart.js'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner.js';


class STChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.date,
			tides: {
				observe: null,
				predict: null,
				calculate: null
			}
		}
	}

	componentDidMount() {
		this.getTides(this.state.date)
	}

	getTides(date) {
		var url_observe = "https://tide-api-ezaki-lab.herokuapp.com/observe"
		fetch(url_observe, {
			method: 'POST',
			body: JSON.stringify({ 'date': date }),
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
			body: JSON.stringify({ 'date': date }),
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
			body: JSON.stringify({ 'date': date }),
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
		if (this.state.tides.observe != null &&
			this.state.tides.predict != null && 
			this.state.tides.calculate != null) {
            return (
				<div>
					<Chart date={this.state.date} tides={this.state.tides} />
				</div>
			);
		}
		else {
            return (
				<div>
					<LoadingSpinner/>
				</div>
            );
		}
	}
}

export default STChart;
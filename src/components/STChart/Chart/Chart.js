import React, { Component } from 'react'
import './Chart.css';

import CanvasJSReact from './lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Chart extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
        return true;
    }

	formatDate(date) {
		if (date == null) {
			return ""
		}
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	makeDataPoints(tides) {
		var dataPoints = []
		for (var i in tides) {
			var point = {
				y: tides[i], label: i.toString()
			}
			dataPoints.push(point)
		}
		return dataPoints
	}

	render() {
		const options = {
			animationEnabled: true,
			axisY: {
				title: "潮位",
				includeZero: false
			},
			axisX: {
				title: "時間",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "spline",
				name: "実測値",
				showInLegend: true,
				dataPoints: this.makeDataPoints(this.props.tides.observe)
			},
			{
				type: "spline",
				name: "予測潮位（機械学習）",
				showInLegend: true,
				dataPoints: this.makeDataPoints(this.props.tides.predict)
			},
			{
				type: "spline",
				name: "天文潮位",
				showInLegend: true,
				dataPoints: this.makeDataPoints(this.props.tides.calculate)
			}]
		};
		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}

export default Chart;
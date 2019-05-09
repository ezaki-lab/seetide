import React, { Component } from 'react'
import './Chart.css';

var CanvasJS = require('./lib/canvasjs.min');


class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.date,
			tides: props.tides
		}
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

	componentDidMount() {
		// if (this.state.tides.observe.length === 0) {
		// 	return
		// }
		// if (this.state.tides.predict.length === 0) {
		// 	return
		// }
		// if (this.state.tides.calculate.length === 0) {
		// 	return
		// }
		var chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			title: {
				text: this.formatDate(this.state.date)
			},
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
				dataPoints: [
					{ y: this.state.tides.observe[0], label: "0" },
					{ y: this.state.tides.observe[1], label: "1" },
					{ y: this.state.tides.observe[2], label: "2" },
					{ y: this.state.tides.observe[3], label: "3" },
					{ y: this.state.tides.observe[4], label: "4" },
					{ y: this.state.tides.observe[5], label: "5" },
					{ y: this.state.tides.observe[6], label: "6" },
					{ y: this.state.tides.observe[7], label: "7" },
					{ y: this.state.tides.observe[8], label: "8" },
					{ y: this.state.tides.observe[9], label: "9" },
					{ y: this.state.tides.observe[10], label: "10" },
					{ y: this.state.tides.observe[11], label: "11" },
					{ y: this.state.tides.observe[12], label: "12" },
					{ y: this.state.tides.observe[13], label: "13" },
					{ y: this.state.tides.observe[14], label: "14" },
					{ y: this.state.tides.observe[15], label: "15" },
					{ y: this.state.tides.observe[16], label: "16" },
					{ y: this.state.tides.observe[17], label: "17" },
					{ y: this.state.tides.observe[18], label: "18" },
					{ y: this.state.tides.observe[19], label: "19" },
					{ y: this.state.tides.observe[20], label: "20" },
					{ y: this.state.tides.observe[21], label: "21" },
					{ y: this.state.tides.observe[22], label: "22" },
					{ y: this.state.tides.observe[23], label: "23" }
				]
			},
			{
				type: "spline",
				name: "予測潮位（機械学習）",
				showInLegend: true,
				dataPoints: [
					{ y: this.state.tides.predict[0], label: "0" },
					{ y: this.state.tides.predict[1], label: "1" },
					{ y: this.state.tides.predict[2], label: "2" },
					{ y: this.state.tides.predict[3], label: "3" },
					{ y: this.state.tides.predict[4], label: "4" },
					{ y: this.state.tides.predict[5], label: "5" },
					{ y: this.state.tides.predict[6], label: "6" },
					{ y: this.state.tides.predict[7], label: "7" },
					{ y: this.state.tides.predict[8], label: "8" },
					{ y: this.state.tides.predict[9], label: "9" },
					{ y: this.state.tides.predict[10], label: "10" },
					{ y: this.state.tides.predict[11], label: "11" },
					{ y: this.state.tides.predict[12], label: "12" },
					{ y: this.state.tides.predict[13], label: "13" },
					{ y: this.state.tides.predict[14], label: "14" },
					{ y: this.state.tides.predict[15], label: "15" },
					{ y: this.state.tides.predict[16], label: "16" },
					{ y: this.state.tides.predict[17], label: "17" },
					{ y: this.state.tides.predict[18], label: "18" },
					{ y: this.state.tides.predict[19], label: "19" },
					{ y: this.state.tides.predict[20], label: "20" },
					{ y: this.state.tides.predict[21], label: "21" },
					{ y: this.state.tides.predict[22], label: "22" },
					{ y: this.state.tides.predict[23], label: "23" }
				]
			},
			{
				type: "spline",
				name: "天文潮位",
				showInLegend: true,
				dataPoints: [
					{ y: this.state.tides.calculate[0], label: "0" },
					{ y: this.state.tides.calculate[1], label: "1" },
					{ y: this.state.tides.calculate[2], label: "2" },
					{ y: this.state.tides.calculate[3], label: "3" },
					{ y: this.state.tides.calculate[4], label: "4" },
					{ y: this.state.tides.calculate[5], label: "5" },
					{ y: this.state.tides.calculate[6], label: "6" },
					{ y: this.state.tides.calculate[7], label: "7" },
					{ y: this.state.tides.calculate[8], label: "8" },
					{ y: this.state.tides.calculate[9], label: "9" },
					{ y: this.state.tides.calculate[10], label: "10" },
					{ y: this.state.tides.calculate[11], label: "11" },
					{ y: this.state.tides.calculate[12], label: "12" },
					{ y: this.state.tides.calculate[13], label: "13" },
					{ y: this.state.tides.calculate[14], label: "14" },
					{ y: this.state.tides.calculate[15], label: "15" },
					{ y: this.state.tides.calculate[16], label: "16" },
					{ y: this.state.tides.calculate[17], label: "17" },
					{ y: this.state.tides.calculate[18], label: "18" },
					{ y: this.state.tides.calculate[19], label: "19" },
					{ y: this.state.tides.calculate[20], label: "20" },
					{ y: this.state.tides.calculate[21], label: "21" },
					{ y: this.state.tides.calculate[22], label: "22" },
					{ y: this.state.tides.calculate[23], label: "23" }
				]
			}]
		});
		chart.render();
	}
	render() {
		return (
			<div id="chartContainer"></div>
		);
	}
}

export default Chart;
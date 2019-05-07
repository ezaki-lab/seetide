import React, { Component } from 'react'
import CanvasJS from './lib/canvasjs.min'
import { ninvoke } from 'q';


class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: props.date
		}
	}

	formatDate(date) {
		if(date == null) {
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
		var chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			title: {
				text: "Tide ( " + this.formatDate(this.state.date) + " )"
			},
			axisY: {
				title: "Number of Customers",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "spline",
				name: "2016",
				showInLegend: true,
				dataPoints: [
					{ y: 155, label: "Jan" },
					{ y: 150, label: "Feb" },
					{ y: 152, label: "Mar" },
					{ y: 148, label: "Apr" },
					{ y: 142, label: "May" },
					{ y: 150, label: "Jun" },
					{ y: 146, label: "Jul" },
					{ y: 149, label: "Aug" },
					{ y: 153, label: "Sept" },
					{ y: 158, label: "Oct" },
					{ y: 154, label: "Nov" },
					{ y: 150, label: "Dec" }
				]
			},
			{
				type: "spline",
				name: "2017",
				showInLegend: true,
				dataPoints: [
					{ y: 172, label: "Jan" },
					{ y: 173, label: "Feb" },
					{ y: 175, label: "Mar" },
					{ y: 172, label: "Apr" },
					{ y: 162, label: "May" },
					{ y: 165, label: "Jun" },
					{ y: 172, label: "Jul" },
					{ y: 168, label: "Aug" },
					{ y: 175, label: "Sept" },
					{ y: 170, label: "Oct" },
					{ y: 165, label: "Nov" },
					{ y: 169, label: "Dec" }
				]
			}]
		});
		chart.render();
	}
	render() {
		return (
			<div id="chartContainer" style={{ height: 100 + "%", width: 90 + "%" }}>
			</div>
		);
	}
}

export default Chart;
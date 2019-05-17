import React, { Component } from 'react'

import Chart from './Chart/Chart.js'
import LoadingSpinner from './LoadingSpinner/LoadingSpinner.js';

const RequestStateTypes = {
    success: 'success',
    failed: 'failed',
    loading: 'loading',
    none: 'none'
}


class STChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStateTypes.none,
            tides: null,
            pendingTides: {
                observe: null,
                predict: null,
                calculate: null
            }
        }
    }

    componentDidMount() {
        this.getTides(this.props.date)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // For re-render component
        if (nextState.requestStatus === RequestStateTypes.success) {
            return true
        }
        // For get tides of selected date
        const diffDate = this.props.date !== nextProps.date;
        return diffDate
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateTypes.none) {
            this.setState({
                tide: null,
                pendingTides: {
                    observe: null,
                    predict: null,
                    calculate: null
                }
            })
            this.getTides(this.props.date)
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateTypes.loading) {
            this.setState({
                requestStatus: RequestStateTypes.none
            });
        }
    }

    getTides(date) {
        console.log("request get tides from https://tide-api-ezaki-lab.herokuapp.com/")
        this.setState({
            requestStatus: RequestStateTypes.loading
        });
        
        var url_observe = "https://tide-api-ezaki-lab.herokuapp.com/observe"
        fetch(url_observe, {
            method: 'POST',
            body: JSON.stringify({ 'date': date }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log("fetched tides (observe)")
                this.setState({
                    pendingTides: {
                        observe: response['tides'],
                        predict: this.state.pendingTides.predict,
                        calculate: this.state.pendingTides.calculate
                    }
                });
                if (this.state.pendingTides.observe != null &&
                    this.state.pendingTides.predict != null &&
                    this.state.pendingTides.calculate != null) {
                    this.setState({
                        tides: this.state.pendingTides,
                        requestStatus: RequestStateTypes.success
                    });
                }
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
                console.log("fetched tides (predict)")
                this.setState({
                    pendingTides: {
                        observe: this.state.pendingTides.observe,
                        predict: response['tides'],
                        calculate: this.state.pendingTides.calculate
                    }
                });
                if (this.state.pendingTides.observe != null &&
                    this.state.pendingTides.predict != null &&
                    this.state.pendingTides.calculate != null) {
                    this.setState({
                        tides: this.state.pendingTides,
                        requestStatus: RequestStateTypes.success
                    });
                }
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
                console.log("fetched tides (calculate)")
                this.setState({
                    pendingTides: {
                        observe: this.state.pendingTides.observe,
                        predict: this.state.pendingTides.predict,
                        calculate: response['tides']
                    }
                });
                if (this.state.pendingTides.observe != null &&
                    this.state.pendingTides.predict != null &&
                    this.state.pendingTides.calculate != null) {
                    this.setState({
                        tides: this.state.pendingTides,
                        requestStatus: RequestStateTypes.success
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }

    render() {
        if (this.state.requestStatus === RequestStateTypes.success) {
            console.log("will render Chart")
            return (
                <div>
                    <Chart date={this.props.date} tides={this.state.tides} />
                </div>
            );
        }
        else {
            console.log("will render Loading")
            return (
                <div>
                    <LoadingSpinner />
                </div>
            );
        }
    }
}

export default STChart;
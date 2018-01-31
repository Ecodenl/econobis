import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

import OpportunitesAPI from '../../api/opportunity/OpportunitiesAPI';

class DashboardChartMembers extends Component {
    constructor(props) {
        super(props);

        this.state= {
            chartData: [],
        }
    };

    componentDidMount() {
        OpportunitesAPI.getChartData().then(payload => {
           this.setState({chartData: payload.data});
        });
    }

    renderChartsData() {
        const chart = [];
        const { chartData = [] } = this.state;

        const labels = chartData.map(item => { return item.name });
        const data = chartData.map(item => { return item.count });

        chart.data = {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    'rgba(48, 129, 95, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(41, 128, 185, 0.8)',
                    'rgba(142, 68, 173, 0.8)',
                    'rgba(203, 185, 86, 0.8)',
                    'rgba(230, 74, 74, 0.8)'
                ],
                hoverBackgroundColor: [
                    'rgba(48, 129, 95,1)',
                    'rgba(39, 174, 96, 1)',
                    'rgba(41, 128, 185, 1)',
                    'rgba(142, 68, 173, 1)',
                    'rgba(203, 185, 86,  1)',
                    'rgba(230, 74, 74, 1)'
                ]
            }]
        };

        chart.options = {
            legend: {
               display: true,
               position: 'right'
            },
            maintainAspectRatio: false,
            responsive: true,
            tooltips: {
                mode: 'label'
            }
        };

        return chart;
    }

    render() {
        const {data, options} = this.renderChartsData();

        return (
            <div>
                <h4>Kansen</h4>
                <div>
                    <Pie
                        data={data}
                        options={options}
                        width={250}
                        height={250}
                    />
                </div>
            </div>
        );
    }
};

export default DashboardChartMembers;
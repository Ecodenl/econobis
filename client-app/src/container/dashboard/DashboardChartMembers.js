import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Pie} from 'react-chartjs-2';

class DashboardChartMembers extends Component {
    constructor(props) {
        super(props);
    }

    renderChartsData() {
        const chart = [];

        chart.data = {
            labels: [
                'Aspirant-lid',
                'Klant-lid',
                'Basis lid',
                'Basis en projectlid',
                'Klant en projectlid',
                'Belangstellende'
            ],
            datasets: [{
                data: [20, 20, 40, 10, 5, 5],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#FF9F40',
                    '#76b852'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#FF9F40',
                    '#76b852'
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
                <h4>Leden</h4>
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

function mapStateToProps(state) {
    return { activeUserCooperationId: state.userDetails.activeUserCooperationId };
}

export default connect(mapStateToProps)(DashboardChartMembers);
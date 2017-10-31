import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Line} from 'react-chartjs-2';

class DashboardChartLeads extends Component {
    constructor(props) {
        super(props);
    }

    renderChartsData() {
        const chart = [];

        chart.data = {
           labels: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli'],
           datasets: [
             {
               label: 'Leads per maand',
               fill: false,
               lineTension: 0.1,
               backgroundColor: 'rgba(75,192,192,0.4)',
               borderColor: 'rgba(75,192,192,1)',
               borderCapStyle: 'butt',
               borderDash: [],
               borderDashOffset: 0.0,
               borderJoinStyle: 'miter',
               pointBorderColor: 'rgba(75,192,192,1)',
               pointBackgroundColor: '#fff',
               pointBorderWidth: 1,
               pointHoverRadius: 5,
               pointHoverBackgroundColor: 'rgba(75,192,192,1)',
               pointHoverBorderColor: 'rgba(220,220,220,1)',
               pointHoverBorderWidth: 2,
               pointRadius: 1,
               pointHitRadius: 10,
               data: [80, 40, 10, 10, 30, 85, 90]
             }
           ]
        };

        chart.options = {
            legend: {
               display: false
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
                <h4>Leads per maand</h4>
                <div>
                    <Line
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

export default connect(mapStateToProps)(DashboardChartLeads);
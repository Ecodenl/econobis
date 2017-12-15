import React, { Component } from 'react';

import OpportunityAPI from './../../api/OpportunityAPI';
import TaskAPI from './../../api/task/TasksAPI';

class DashboardButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountActiveTasks: [],
            amountActiveOpportunities: []
        }
    };
    componentWillMount() {
        OpportunityAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveOpportunities: payload
            });
        });
        TaskAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveTasks: payload
            });
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="panel panel-default" id="dashboardbutton-red">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">EMAIL</h4>
                            <h4 className="text-center text-bold">14</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default" id="dashboardbutton-blue">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">AANMELDINGEN</h4>
                            <h4 className="text-center text-bold">8</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default" id="dashboardbutton-green">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">KANSEN</h4>
                            <h4 className="text-center text-bold">{this.state.amountActiveOpportunities}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default" id="dashboardbutton-yellow">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">TAKEN</h4>
                            <h4 className="text-center text-bold">{this.state.amountActiveTasks}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardButtons;
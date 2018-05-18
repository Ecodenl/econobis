import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import EmailAPI from './../../api/email/EmailAPI';
import IntakesAPI from './../../api/intake/IntakesAPI';
import OpportunitiesAPI from '../../api/opportunity/OpportunitiesAPI';
import TaskAPI from './../../api/task/TasksAPI';

class DashboardButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amountOpenEmails: '-',
            amountActiveIntakes: '-',
            amountActiveTasks: '-',
            amountActiveOpportunities: '-',
        }
    };
    componentWillMount() {
        EmailAPI.getAmountOpen().then(payload => {
            this.setState({
                amountOpenEmails: payload
            });
        });
        IntakesAPI.getAmountActive().then(payload => {
            this.setState({
                amountActiveIntakes: payload
            });
        });
        OpportunitiesAPI.getAmountActive().then(payload => {
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
                <div className="col-md-3" onClick={() => hashHistory.push(`/emails/inbox/eigen`)}>
                    <div className="panel panel-default" id="dashboardbutton-1">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">E-MAIL</h4>
                            <h4 className="text-center text-bold">{this.state.amountOpenEmails}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" onClick={() => hashHistory.push(`/intakes`)}>
                    <div className="panel panel-default" id="dashboardbutton-2">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">INTAKES</h4>
                            <h4 className="text-center text-bold">{this.state.amountActiveIntakes}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" onClick={() => hashHistory.push(`/kansen`)}>
                    <div className="panel panel-default" id="dashboardbutton-3">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">KANSEN</h4>
                            <h4 className="text-center text-bold">{this.state.amountActiveOpportunities}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" onClick={() => hashHistory.push(`/taken/eigen`)}>
                    <div className="panel panel-default" id="dashboardbutton-4">
                        <div className="panel-body">
                            <h4 className="text-center text-bold">OPEN TAKEN</h4>
                            <h4 className="text-center text-bold">{this.state.amountActiveTasks}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardButtons;
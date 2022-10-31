import React, { Component } from 'react';

import ButtonEmails from './../../buttons/ButtonEmails';
import ButtonTasks from './../../buttons/ButtonTasks';
import JobLogs from '../../jobs-log/JobLogs';
import { connect } from 'react-redux';

class DashboardDefaultApp extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    {this.props.permissions.viewEmail ? <ButtonEmails size={'col-xs-3'} /> : null}
                    {this.props.permissions.viewTask ? <ButtonTasks size={'col-xs-3'} /> : null}
                </div>
                {/*<DashboardMain/>*/}
                <div className={'row'}>{this.props.permissions.viewJobsLog ? <JobLogs size={'col-xs-6'} /> : null}</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(DashboardDefaultApp);

import React, { Component } from 'react';

import ButtonEmails from "./../../buttons/ButtonEmails";
import ButtonTasks from "./../../buttons/ButtonTasks";
import JobLogs from "../../jobs-log/JobLogs";

class DashboardDefaultApp extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-3'}/>
                    <ButtonTasks size={'col-xs-3'}/>
                </div>
                {/*<DashboardMain/>*/}
                <div className={'row'}>
                    <JobLogs size={'col-xs-6'}/>
                </div>
            </div>
        )
    }
}

export default DashboardDefaultApp;
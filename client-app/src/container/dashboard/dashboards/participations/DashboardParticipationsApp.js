import React, { Component } from 'react';

import ButtonEmails from './../../buttons/ButtonEmails';
import ButtonTasks from './../../buttons/ButtonTasks';
import DashboardParticipationsMain from './DashboardParticipationsMain';

class DashboardParticipationsApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-2'} />
                    <ButtonTasks size={'col-xs-2'} />
                </div>
                <DashboardParticipationsMain />
            </div>
        );
    }
}

export default DashboardParticipationsApp;

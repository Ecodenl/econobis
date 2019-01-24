import React, { Component } from 'react';

import ButtonEmails from './../../buttons/ButtonEmails';
import ButtonIntakes from './../../buttons/ButtonIntakes';
import ButtonOpportunities from './../../buttons/ButtonOpportunities';
import ButtonTasks from './../../buttons/ButtonTasks';
import ButtonQuotationRequests from '../../buttons/ButtonQuotationRequests';

class DashboardEnergySavingApp extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <ButtonEmails size={'col-xs-2'} />
                    <ButtonTasks size={'col-xs-2'} />
                    <ButtonIntakes size={'col-xs-2'} />
                    <ButtonOpportunities size={'col-xs-2'} />
                    <ButtonQuotationRequests size={'col-xs-2'} />
                </div>
            </div>
        );
    }
}

export default DashboardEnergySavingApp;

import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import FinancialOverviewContactList from './FinancialOverviewContactList';

class FinancialOverviewContactApp extends Component {
    constructor(props) {
        super(props);
        //todo WM: opschonen log
        // console.log('FinancialOverviewContactApp');
        // console.log(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Contacten</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <FinancialOverviewContactList financialOverview={this.props.financialOverview} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default FinancialOverviewContactApp;

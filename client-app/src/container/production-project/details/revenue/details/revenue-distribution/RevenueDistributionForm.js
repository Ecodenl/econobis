import React, { Component} from 'react';

import RevenueDistributionFormList from './RevenueDistributionFormList';
import Panel from '../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../../components/panel/PanelHeader';

class RevenueDistributionForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Opbrengstverdeling participanten</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <RevenueDistributionFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

export default RevenueDistributionForm;

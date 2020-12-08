import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';

const FinancialOverviewProjectDetailsFormGeneralView = props => {
    // todo WM: opschonen log regels
    // console.log('FinancialOverviewProjectDetailsFormGeneralView');
    // console.log(props);
    return (
        <div>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Project'} value={props.project.name} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FinancialOverviewProjectDetailsFormGeneralView;

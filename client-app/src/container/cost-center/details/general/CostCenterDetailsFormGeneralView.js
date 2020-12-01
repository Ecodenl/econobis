import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const CostCenterDetailsFormGeneralView = ({ description, twinfieldCostCenterCode, switchToEdit }) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Omschrijving'} value={description} />
                    </div>

                    <div className="row">
                        <ViewText label={'Twinfield kostenplaats code'} value={twinfieldCostCenterCode} />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default CostCenterDetailsFormGeneralView;

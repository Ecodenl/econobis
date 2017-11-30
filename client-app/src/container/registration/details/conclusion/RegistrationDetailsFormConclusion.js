import React from 'react';

import RegistrationDetailsFormConclusionView from './RegistrationDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const RegistrationDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <RegistrationDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default RegistrationDetailsFormConclusion;
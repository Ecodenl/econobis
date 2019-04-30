import React from 'react';

import AdministrationDetailsFormConclusionView from './AdministrationDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const AdministrationDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <AdministrationDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default AdministrationDetailsFormConclusion;

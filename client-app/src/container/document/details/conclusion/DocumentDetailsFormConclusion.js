import React from 'react';

import DocumentDetailsFormConclusionView from './DocumentDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const DocumentDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <DocumentDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default DocumentDetailsFormConclusion;
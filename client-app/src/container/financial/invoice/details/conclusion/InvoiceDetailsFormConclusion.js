import React from 'react';

import InvoiceDetailsFormConclusionView from './InvoiceDetailsFormConclusionView';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

const InvoiceDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <InvoiceDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default InvoiceDetailsFormConclusion;
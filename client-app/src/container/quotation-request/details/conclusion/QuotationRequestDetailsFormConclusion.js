import React from 'react';

import QuotationRequestDetailsFormConclusionView from './QuotationRequestDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const QuotationRequestDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <QuotationRequestDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default QuotationRequestDetailsFormConclusion;

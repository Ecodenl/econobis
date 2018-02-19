import React from 'react';

import QuotationRequestNewFormGeneral from './QuotationRequestNewFormGeneral';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const QuotationRequestNewForm = props => {
        return (
            <div>
                <Panel>
                    <PanelBody>
                        <QuotationRequestNewFormGeneral opportunityId={props.opportunityId}/>
                    </PanelBody>
                </Panel>
            </div>
        );
};

export default QuotationRequestNewForm;

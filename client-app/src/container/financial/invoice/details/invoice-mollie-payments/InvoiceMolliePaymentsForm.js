import React, {Component} from 'react';

import InvoiceMolliePaymentsFormList from './InvoiceMolliePaymentsFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';

class InvoiceMolliePaymentsForm extends Component {
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Online betalingtransacties</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <InvoiceMolliePaymentsFormList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default InvoiceMolliePaymentsForm;

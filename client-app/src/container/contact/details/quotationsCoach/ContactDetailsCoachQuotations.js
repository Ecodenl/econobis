import React, { Component } from 'react';

import ContactDetailsCoachQuotationsList from './ContactDetailsCoachQuotationsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsCoachQuotations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Offertes coach</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsCoachQuotationsList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ContactDetailsCoachQuotations;

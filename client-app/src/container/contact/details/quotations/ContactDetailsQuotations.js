import React, { Component } from 'react';

import ContactDetailsQuotationsList from './ContactDetailsQuotationsList';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class ContactDetailsQuotations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Offertes</span>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <ContactDetailsQuotationsList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ContactDetailsQuotations;

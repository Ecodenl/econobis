import React, { Component } from 'react';

import InvoiceDetailsFormGeneralView from './InvoiceDetailsFormGeneralView';

class InvoiceDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <InvoiceDetailsFormGeneralView />
            </div>
        );
    }
}

export default InvoiceDetailsFormGeneral;

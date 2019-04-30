import React from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InvoicesPaidTransferList from './InvoicesPaidTransferList';

const InvoicePaidTransferHarmonica = ({ toggleShowList, showInvoicesPaidTransferList, invoicePaidTransferCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList} role="button">
                    <span>
                        OVERBOEKINGEN <span className="badge">{invoicePaidTransferCount}</span>
                    </span>
                </div>
                <div className="col-sm-12">{showInvoicesPaidTransferList && <InvoicesPaidTransferList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default InvoicePaidTransferHarmonica;

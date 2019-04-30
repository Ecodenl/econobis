import React from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InvoicesPaidCollectionList from './InvoicesPaidCollectionList';

const InvoicePaidCollectionHarmonica = ({
    toggleShowList,
    showInvoicesPaidCollectionList,
    invoicePaidCollectionCount,
}) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList} role="button">
                    <span>
                        GEÏNCASSEERDE INCASSO'S <span className="badge">{invoicePaidCollectionCount}</span>
                    </span>
                </div>
                <div className="col-sm-12">{showInvoicesPaidCollectionList && <InvoicesPaidCollectionList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default InvoicePaidCollectionHarmonica;

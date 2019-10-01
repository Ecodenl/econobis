import React from 'react';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InvoicesList from './InvoicesList';

const InvoiceHarmonica = ({ toggleShowList, showInvoicesList, invoiceCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList} role="button">
                    <span>
                        NOTA'S <span className="badge">{invoiceCount}</span>
                    </span>
                </div>
                <div className="col-sm-12">{showInvoicesList && <InvoicesList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default InvoiceHarmonica;

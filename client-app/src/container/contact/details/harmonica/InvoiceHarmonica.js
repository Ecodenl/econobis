import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrdersList from './OrdersList';
import InvoicesList from './InvoicesList';

const InvoiceHarmonica = ({ toggleShowList, showInvoicesList, invoiceCount }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">
                        FACTUREN <span className="badge">{invoiceCount}</span>
                    </span>
                </div>
                <div className="col-sm-2" />
                <div className="col-sm-12">{showInvoicesList && <InvoicesList />}</div>
            </PanelBody>
        </Panel>
    );
};

export default InvoiceHarmonica;

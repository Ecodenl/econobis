import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrdersList from './OrdersList';
import InvoicesList from './InvoicesList';

const InvoiceHarmonica = ({ toggleShowList, showInvoicesList, invoiceCount, permissions }) => {
    return (
        permissions.viewInvoice && (
            <Panel className={'harmonica-button'}>
                <PanelBody>
                    <div className="col-sm-10" onClick={toggleShowList} role="button">
                        <span className="">
                            NOTA'S <span className="badge">{invoiceCount}</span>
                        </span>
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-12">{showInvoicesList && <InvoicesList />}</div>
                </PanelBody>
            </Panel>
        )
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};
export default connect(mapStateToProps, null)(InvoiceHarmonica);

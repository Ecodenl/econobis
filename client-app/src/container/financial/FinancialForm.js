import React from 'react';
import { connect } from 'react-redux';
import OrdersList from './order/list/OrdersList';
import InvoicesList from './invoice/list/InvoicesList';
import Panel from '../../components/panel/Panel';
import PanelBody from '../../components/panel/PanelBody';
import PaymentInvoicesList from './payment-invoice/list/PaymentInvoicesList';

const FinancialForm = ({ administrationDetails, filter, type }) => (
    <React.Fragment>
        {administrationDetails.id ? (
            <div>
                {type === 'orders' && (
                    <Panel>
                        <PanelBody>
                            <OrdersList
                                administrationId={administrationDetails.id}
                                filter={filter}
                            />
                        </PanelBody>
                    </Panel>
                )}
                {type === 'facturen' && (
                    <Panel>
                        <PanelBody>
                            <InvoicesList
                                administrationId={administrationDetails.id}
                                filter={filter}
                            />
                        </PanelBody>
                    </Panel>
                )}
                {type === 'uitkering-facturen' && (
                    <Panel>
                        <PanelBody>
                            <PaymentInvoicesList
                                administrationId={administrationDetails.id}
                                filter={filter}
                            />
                        </PanelBody>
                    </Panel>
                )}
                {type === undefined && <div>Selecteer orders of facturen.</div>}
            </div>
        ) : (
            <Panel>
                <PanelBody>
                    <div>Geen administratie gevonden</div>
                </PanelBody>
            </Panel>
        )}
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(FinancialForm);

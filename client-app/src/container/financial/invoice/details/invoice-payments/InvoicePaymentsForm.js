import React, { Component } from 'react';

import InvoicePaymentsFormList from './InvoicePaymentsFormList';
import InvoicePaymentsFormNew from './InvoicePaymentsFormNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';
import { refresh } from 'react-icons-kit/fa/refresh';
import ButtonText from '../../../../../components/button/ButtonText';
import InvoiceDetailsFormSyncOneInvoiceFromTwinfield from '../general/InvoiceDetailsFormSyncOneInvoiceFromTwinfield';

class InvoicePaymentsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            syncingFromInvoices: false,
            showModalOneInvoiceSyncToTwinfield: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    showModalOneInvoiceSyncToTwinfield = () => {
        this.setState({
            ...this.state,
            showModalOneInvoiceSyncToTwinfield: true,
        });
    };

    closeModalOneInvoiceSyncToTwinfield = () => {
        this.setState({
            ...this.state,
            showModalOneInvoiceSyncToTwinfield: false,
        });
    };
    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Betalingen</span>
                    {this.props.invoiceInTwinfield &&
                        this.props.invoicePaidInTwinfield &&
                        this.props.permissions.manageFinancial && (
                            <ButtonText
                                buttonClassName={'pull-right'}
                                loading={this.state.syncingFromInvoices}
                                loadText={'Betalingen aan het ophalen'}
                                buttonText={
                                    <span title="Betalingen van Twinfield ophalen">
                                        <Icon size={14} icon={refresh} />
                                        &nbsp;Betalingen
                                    </span>
                                }
                                onClickAction={this.showModalOneInvoiceSyncToTwinfield}
                            />
                        )}
                    {!this.props.invoiceInTwinfield &&
                        !this.props.invoicePaidInTwinfield &&
                        this.props.permissions.manageFinancial && (
                            <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                                <Icon size={14} icon={plus} />
                            </a>
                        )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <InvoicePaymentsFormList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <InvoicePaymentsFormNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
                {this.state.showModalOneInvoiceSyncToTwinfield && (
                    <InvoiceDetailsFormSyncOneInvoiceFromTwinfield
                        closeModal={this.closeModalOneInvoiceSyncToTwinfield}
                        administrationId={this.props.administrationId}
                        invoiceId={this.props.invoiceId}
                    />
                )}
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        invoiceId: state.invoiceDetails.id,
        administrationId: state.invoiceDetails.administrationId,
        invoiceInTwinfield: state.invoiceDetails.invoiceInTwinfield,
        invoicePaidInTwinfield: state.invoiceDetails.invoicePaidInTwinfield,
    };
};

export default connect(mapStateToProps)(InvoicePaymentsForm);

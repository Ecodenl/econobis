import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoiceSendList from './InvoiceSendList';
import InvoicesAPI from '../../../../api/invoice/InvoicesAPI';
import InvoiceSendViewPdf from './InvoiceSendViewPdf';
import InvoiceSendViewEmail from './InvoiceSendViewEmail';
import InvoiceSendToolbar from './InvoiceSendToolbar';
import { clearPreviewSend } from '../../../../actions/invoice/InvoicesActions';
import { connect } from 'react-redux';
import { fetchAdministrationDetails } from '../../../../actions/administration/AdministrationDetailsActions';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const InvoiceSendAppWrapper = props => {
    const params = useParams();
    return <InvoiceSendApp {...props} params={params} />;
};

class InvoiceSendApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            invoiceId: '',
            isLoading: false,
        };
    }

    componentWillUnmount() {
        this.props.clearPreviewSend();
    }

    componentDidMount() {
        this.props.fetchAdministrationDetails(this.props.params.id);
        this.setState({ isLoading: true });
        InvoicesAPI.getInvoicesForSending(this.props.invoicePreviewSend)
            .then(payload => {
                this.setState({
                    invoices: payload.data,
                    isLoading: false,
                });
            })
            .catch(error => {
                this.setState({ isLoading: false });
            });
    }

    changeInvoice = invoiceId => {
        this.setState({
            invoiceId: invoiceId,
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-small'}>
                                    <InvoiceSendToolbar
                                        type={this.props.params.type}
                                        paymentType={this.props.params.paymentType}
                                        invoiceIds={this.props.invoicePreviewSend}
                                        amountOfInvoices={this.state.invoices ? this.state.invoices.length : 0}
                                        administrationId={this.props.params.id}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={'panel-invoices-list'}>
                                    <InvoiceSendList
                                        invoices={this.state.invoices}
                                        isLoading={this.state.isLoading}
                                        changeInvoice={this.changeInvoice}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <InvoiceSendViewPdf
                                        invoiceId={this.state.invoiceId}
                                        isLoading={this.state.isLoading}
                                        amountOfInvoices={this.state.invoices ? this.state.invoices.length : -1}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody>
                                    <InvoiceSendViewEmail
                                        invoiceId={this.state.invoiceId}
                                        isLoading={this.state.isLoading}
                                        amountOfInvoices={this.state.invoices ? this.state.invoices.length : -1}
                                    />
                                </PanelBody>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoicePreviewSend: state.invoicePreviewSend,
    };
};

const mapDispatchToProps = dispatch => ({
    clearPreviewSend: () => {
        dispatch(clearPreviewSend());
    },
    fetchAdministrationDetails: id => {
        dispatch(fetchAdministrationDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSendAppWrapper);

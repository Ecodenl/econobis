import React, {Component} from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoiceSendList from "./InvoiceSendList";
import InvoicesAPI from "../../../../api/invoice/InvoicesAPI";
import InvoiceSendViewPdf from "./InvoiceSendViewPdf";
import InvoiceSendViewEmail from "./InvoiceSendViewEmail";
import InvoiceSendToolbar from "./InvoiceSendToolbar";
import {clearPreviewSend} from "../../../../actions/invoice/InvoicesActions";
import {connect} from "react-redux";

class InvoiceSendApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            invoiceId: '',
        };
    };

    componentWillUnmount(){
        this.props.clearPreviewSend();
    }

    componentDidMount() {
        InvoicesAPI.getInvoicesForSending(this.props.invoicePreviewSend).then((payload) => {
            this.setState({
                invoices: payload.data,
            });
        });
    };

    changeInvoice = (invoiceId) => {
        this.setState({
            invoiceId: invoiceId
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 margin-10-top">
                        <div className="col-md-12 margin-10-top">
                            <Panel>
                                <PanelBody className={"panel-small"}>
                                    <InvoiceSendToolbar invoiceIds={this.props.invoicePreviewSend} amountOfInvoices={this.state.invoices ? this.state.invoices.length : 0} administrationId={this.props.params.id}/>
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
                                <InvoiceSendList invoices={this.state.invoices} changeInvoice={this.changeInvoice}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <InvoiceSendViewPdf invoiceId={this.state.invoiceId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody>
                                <InvoiceSendViewEmail invoiceId={this.state.invoiceId}/>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
            </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        invoicePreviewSend: state.invoicePreviewSend,
    }
};

const mapDispatchToProps = dispatch => ({
    clearPreviewSend: () => {
        dispatch(clearPreviewSend());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSendApp);

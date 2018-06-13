import React, {Component} from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InvoiceSendList from "./InvoiceSendList";
import InvoicesAPI from "../../../../api/invoice/InvoicesAPI";
import InvoiceSendViewPdf from "./InvoiceSendViewPdf";
import InvoiceSendViewEmail from "./InvoiceSendViewEmail";
import InvoiceSendToolbar from "./InvoiceSendToolbar";

class InvoiceSendApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            invoiceId: '',
        };
    };

    componentDidMount() {
        InvoicesAPI.getInvoicesForSending(this.props.params.id).then((payload) => {
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
                                    <InvoiceSendToolbar amountOfInvoices={this.state.invoices ? this.state.invoices.length : 0} administrationId={this.props.params.id}/>
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


export default InvoiceSendApp;

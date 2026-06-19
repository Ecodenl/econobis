import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

class InvoiceSendViewEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.invoiceId !== nextProps.invoiceId) {
            if (nextProps.invoiceId) {
                this.downloadEmail(nextProps.invoiceId);
            }
        }
    }

    downloadEmail(invoiceId) {
        InvoiceDetailsAPI.getEmailPreview(invoiceId).then(payload => {
            this.setState({
                email: payload,
            });
        });
    }

    render() {
        return this.props.isLoading ? (
            <div>Gegevens aan het laden.</div>
        ) : !this.state.email ? (
            this.props.amountOfInvoices > 0 ? (
                <div>Selecteer links in het scherm een contact om een preview te zien.</div>
            ) : (
                <div>Geen gegevens gevonden.</div>
            )
        ) : (
            <div>
                <div className="row margin-10-top">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Aan</label>
                            </div>
                            <div className="col-sm-9">{this.state.email.to}</div>
                        </div>
                    </div>
                </div>
                {this.state.email.bcc ? (
                    <div className="row margin-10-top">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3">
                                    <label className="col-sm-12">Bcc</label>
                                </div>
                                <div className="col-sm-9">{this.state.email.bcc}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="row margin-10-top">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="col-sm-12">Onderwerp</label>
                            </div>
                            <div className="col-sm-9">{this.state.email.subject}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ViewHtmlAsText label={'Tekst'} value={this.state.email.htmlBody} />
                </div>
            </div>
        );
    }
}

export default InvoiceSendViewEmail;

import React, { Component } from 'react';
import ProjectRevenueAPI from '../../../../../../api/project/ProjectRevenueAPI';
import ViewHtmlAsText from '../../../../../../components/form/ViewHtmlAsText';

class PaymentInvoiceCreateViewEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.distributionId !== this.props.distributionId) {
            if (this.props.distributionId) {
                this.downloadEmail(this.props.distributionId);
            }
        }
    }

    downloadEmail(distributionId) {
        ProjectRevenueAPI.previewEmail(distributionId, this.props.subject, this.props.emailTemplateId).then(payload => {
            this.setState({
                email: payload.data,
            });
        });
    }

    render() {
        return this.props.isLoading ? (
            <div>Gegevens aan het laden.</div>
        ) : !this.state.email ? (
            this.props.amountOfDistributions > 0 ? (
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

export default PaymentInvoiceCreateViewEmail;

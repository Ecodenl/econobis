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

    componentWillReceiveProps(nextProps) {
        if (this.props.distributionId !== nextProps.distributionId) {
            if (nextProps.distributionId) {
                this.downloadEmail(nextProps.distributionId);
            }
        }
    }

    downloadEmail(distributionId) {
        ProjectRevenueAPI.previewEmail(
            distributionId,
            this.props.subject,
            this.props.documentTemplateId,
            this.props.emailTemplateId
        ).then(payload => {
            this.setState({
                email: payload.data,
            });
        });
    }

    render() {
        return !this.state.email ? (
            <div>Geen gegevens gevonden.</div>
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

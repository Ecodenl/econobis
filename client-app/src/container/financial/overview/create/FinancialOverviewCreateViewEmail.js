import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';
import ViewHtmlAsText from '../../../../components/form/ViewHtmlAsText';

class FinancialOverviewCreateViewEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
        };
    }

    // componentDidMount() {
    //     this.downloadEmail(this.props.financialOverviewContactId);
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.financialOverviewContactId !== nextProps.financialOverviewContactId) {
            if (nextProps.financialOverviewContactId) {
                this.downloadEmail(nextProps.financialOverviewContactId);
            }
        }
    }

    downloadEmail(financialOverviewContactId) {
        FinancialOverviewContactAPI.getEmailPreview(financialOverviewContactId).then(payload => {
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

export default FinancialOverviewCreateViewEmail;

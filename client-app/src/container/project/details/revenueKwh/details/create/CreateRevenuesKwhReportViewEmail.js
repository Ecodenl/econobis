import React, { Component } from 'react';
import ViewHtmlAsText from '../../../../../../components/form/ViewHtmlAsText';
import RevenuesKwhAPI from '../../../../../../api/project/RevenuesKwhAPI';

class CreateRevenuesKwhReportViewEmail extends Component {
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
        RevenuesKwhAPI.previewEmail(
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

export default CreateRevenuesKwhReportViewEmail;

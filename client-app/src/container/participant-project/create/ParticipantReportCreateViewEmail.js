import React, { Component } from 'react';
import ViewHtmlAsText from '../../../components/form/ViewHtmlAsText';
import ParticipantsProjectAPI from '../../../api/participant-project/ParticipantsProjectAPI';

class ParticipantReportCreateViewEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.participantId !== nextProps.participantId) {
            if (nextProps.participantId) {
                this.downloadEmail(nextProps.participantId);
            }
        }
    }

    downloadEmail(participantId) {
        ParticipantsProjectAPI.previewEmail(this.props.emailTemplateId, participantId).then(payload => {
            this.setState({
                email: payload,
            });
        });
    }

    render() {
        return this.props.isLoading ? (
            <div>Gegevens aan het laden.</div>
        ) : !this.state.email ? (
            this.props.amountOfParticipants > 0 && this.state.email == null ? (
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
                            <div className="col-sm-9">{this.props.subject}</div>
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

export default ParticipantReportCreateViewEmail;

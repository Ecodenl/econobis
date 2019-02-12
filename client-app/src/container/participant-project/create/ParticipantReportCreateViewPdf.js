import React, { Component } from 'react';
import PdfViewer from '../../../components/pdf/PdfViewer';
import ParticipantsProjectAPI from '../../../api/participant-project/ParticipantsProjectAPI';

class ParticipantReportCreateViewPdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.participantId !== this.props.participantId) {
            if (this.props.participantId) {
                this.downloadFile(this.props.participantId);
            }
        }
    }

    downloadFile(participantId, i = 0) {
        ParticipantsProjectAPI.previewPDF(this.props.documentTemplateId, this.props.emailTemplateId, participantId)
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(participantId, i);
                    }, 500);
                }
                i++;
            });
    }

    render() {
        return !this.state.file ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <PdfViewer file={this.state.file} />
            </div>
        );
    }
}

export default ParticipantReportCreateViewPdf;

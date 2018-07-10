import React, {Component} from 'react';
import {isEmpty} from 'lodash';
import PdfViewer from "../../../../../components/pdf/PdfViewer";
import ParticipantsProductionProjectAPI from "../../../../../api/participant-production-project/ParticipantsProductionProjectAPI";

class ParticipantReportCreateViewPdf extends Component {
    constructor(props){
        super(props);

        this.state = {
            file: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.participantId !== nextProps.participantId) {
            if (nextProps.participantId) {
                this.downloadFile(nextProps.participantId);
            }
        }
    }

    downloadFile(participantId, i = 0) {
        ParticipantsProductionProjectAPI.previewPDF(this.props.documentTemplateId, this.props.emailTemplateId, participantId).then((payload) => {
            this.setState({
                file: payload.data,
            });
        }).catch(() => {
            if (i < 2) {
                setTimeout(() => {
                    this.downloadFile(participantId, i);
                }, 500);
            }
            i++;
        });
    };

    render() {
        return (
            !this.state.file ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <PdfViewer
                        file={this.state.file}
                    />
                </div>

        );
    }
};

export default ParticipantReportCreateViewPdf;

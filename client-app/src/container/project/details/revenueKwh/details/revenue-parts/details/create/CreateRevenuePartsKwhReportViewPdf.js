import React, { Component } from 'react';
import PdfViewer from '../../../../../../../../components/pdf/PdfViewer';
import RevenuePartsKwhAPI from '../../../../../../../../api/project/RevenuePartsKwhAPI';

class CreateRevenuePartsKwhReportViewPdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.distributionId !== nextProps.distributionId) {
            if (nextProps.distributionId) {
                this.downloadFile(nextProps.distributionId);
            }
        }
    }

    downloadFile(distributionId, i = 0) {
        RevenuePartsKwhAPI.downloadPreview(
            distributionId,
            this.props.subject,
            this.props.documentTemplateId,
            this.props.emailTemplateId
        )
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(distributionId, i);
                    }, 500);
                }
                i++;
            });
    }

    render() {
        return this.props.isLoading ? (
            <div>Gegevens aan het laden.</div>
        ) : !this.state.file ? (
            this.props.amountOfDistributions > 0 ? (
                <div>Selecteer links in het scherm een contact om een preview te zien.</div>
            ) : (
                <div>Geen gegevens gevonden.</div>
            )
        ) : (
            <div>
                <PdfViewer file={this.state.file} />
            </div>
        );
    }
}

export default CreateRevenuePartsKwhReportViewPdf;
import React, { Component } from 'react';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';

class FinancialOverviewCreateViewPdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.financialOverviewContactId !== prevProps.financialOverviewContactId) {
            if (this.props.financialOverviewContactId) {
                this.downloadFile(this.props.financialOverviewContactId);
            }
        }
    }

    downloadFile(financialOverviewContactId, i = 0) {
        FinancialOverviewContactAPI.download(financialOverviewContactId)
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(financialOverviewContactId, i);
                    }, 500);
                }
                i++;
            });
    }

    render() {
        return this.props.isLoading ? (
            <div>Gegevens aan het laden.</div>
        ) : !this.state.file ? (
            this.props.amountOfFinancialOverviewContacts > 0 ? (
                <div>Selecteer een contact om een preview te zien.</div>
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

export default FinancialOverviewCreateViewPdf;

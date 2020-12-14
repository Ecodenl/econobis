import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import FinancialOverviewContactAPI from '../../../../api/financial/overview/FinancialOverviewContactAPI';

class FinancialOverviewCreateViewPdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    // componentDidMount() {
    //     this.downloadFile(this.props.financialOverviewContactId);
    // }

    componentWillReceiveProps(nextProps) {
        if (this.props.financialOverviewContactId !== nextProps.financialOverviewContactId) {
            if (nextProps.financialOverviewContactId) {
                this.downloadFile(nextProps.financialOverviewContactId);
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
        return !this.state.file ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <PdfViewer file={this.state.file} />
            </div>
        );
    }
}

export default FinancialOverviewCreateViewPdf;

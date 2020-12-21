import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../../components/pdf/PdfViewer';
import FinancialOverviewContactAPI from '../../../../../api/financial/overview/FinancialOverviewContactAPI';

class FinancialOverviewContactViewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentDidMount() {
        this.downloadFile();
    }

    downloadFile(i = 0) {
        FinancialOverviewContactAPI.download(this.props.financialOverviewContactId)
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(i);
                    }, 500);
                }
                i++;
            });
    }

    render() {
        return isEmpty(this.props.financialOverviewContactDetails) || !this.state.file ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <PdfViewer file={this.state.file} scale={this.props.scale} />
            </div>
        );
    }
}

export default FinancialOverviewContactViewForm;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import FinancialOverviewDetailsAPI from '../../../../api/financial/overview/FinancialOverviewDetailsAPI';

class FinancialOverviewContactPreviewForm extends Component {
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
        FinancialOverviewDetailsAPI.downloadPreview(this.props.financialOverviewId, this.props.contactId)
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

// const mapStateToProps = state => {
//     return {
//         financialOverviewContactDetails: state.financialOverviewContactDetails,
//     };
// };
//
// export default connect(mapStateToProps, null)(FinancialOverviewContactPreviewForm);
export default FinancialOverviewContactPreviewForm;

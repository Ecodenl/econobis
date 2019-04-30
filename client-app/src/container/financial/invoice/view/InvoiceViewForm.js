import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';

class InvoiceViewForm extends Component {
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
        InvoiceDetailsAPI.download(this.props.invoiceId)
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
        return isEmpty(this.props.invoiceDetails) || !this.state.file ? (
            <div>Geen gegevens gevonden.</div>
        ) : (
            <div>
                <PdfViewer file={this.state.file} scale={this.props.scale} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoiceDetails: state.invoiceDetails,
    };
};

export default connect(
    mapStateToProps,
    null
)(InvoiceViewForm);

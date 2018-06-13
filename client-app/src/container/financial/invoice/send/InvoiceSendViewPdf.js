import React, {Component} from 'react';
import {isEmpty} from 'lodash';
import PdfViewer from "../../../../components/pdf/PdfViewer";
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";

class InvoiceSendViewPdf extends Component {
    constructor(props){
        super(props);

        this.state = {
            file: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.invoiceId !== nextProps.invoiceId) {
            if (nextProps.invoiceId) {
                this.downloadFile(nextProps.invoiceId);
            }
        }
    }

    downloadFile(invoiceId, i = 0) {
        InvoiceDetailsAPI.download(invoiceId).then((payload) => {
            this.setState({
                file: payload.data,
            });
        }).catch(() => {
            if (i < 2) {
                setTimeout(() => {
                    this.downloadFile(invoiceId, i);
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

export default InvoiceSendViewPdf;

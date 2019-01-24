import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PdfViewer from '../../../../components/pdf/PdfViewer';
import OrderDetailsAPI from '../../../../api/order/OrderDetailsAPI';

class OrderCreateViewPdf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.orderId !== nextProps.orderId) {
            if (nextProps.orderId) {
                this.downloadFile(nextProps.orderId);
            }
        }
    }

    downloadFile(orderId, i = 0) {
        OrderDetailsAPI.downloadPreview(orderId)
            .then(payload => {
                this.setState({
                    file: payload.data,
                });
            })
            .catch(() => {
                if (i < 2) {
                    setTimeout(() => {
                        this.downloadFile(orderId, i);
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

export default OrderCreateViewPdf;

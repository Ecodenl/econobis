import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// Functionele wrapper voor de class component
const InvoicesPaidTransferPaidTransferListWrapper = props => {
    const navigate = useNavigate();
    return <InvoicesPaidTransferPaidTransferList {...props} navigate={navigate} />;
};

class InvoicesPaidTransferPaidTransferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedInvoicesPaidTransfer: '',
        };
    }

    openItem = id => {
        this.props.navigate(`/nota/${id}`);
    };

    render() {
        const { relatedInvoicesPaidTransfer } = this.props;
        return (
            <div>
                {relatedInvoicesPaidTransfer == '' && <div>Geen overboekingen gevonden.</div>}

                {relatedInvoicesPaidTransfer != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedInvoicesPaidTransfer.map((relatedInvoice, i) => {
                                return (
                                    <tr onClick={() => this.openItem(relatedInvoice.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(relatedInvoice.createdAt).format('L')} - {relatedInvoice.number}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        relatedInvoicesPaidTransfer: state.orderDetails.relatedInvoicesPaidTransfer,
    };
};

export default connect(mapStateToProps)(InvoicesPaidTransferPaidTransferListWrapper);

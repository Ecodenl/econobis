import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

class InvoicesPaidTransferPaidTransferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedInvoicesPaidTransfer: '',
        };
    }

    openItem = (id) => {
        hashHistory.push(`/factuur/${id}`);
    };

    render() {
        const {relatedInvoicesPaidTransfer} = this.props;
        return (
            <div>
                {relatedInvoicesPaidTransfer == '' &&
                <div>Geen overboekingen gevonden.</div>
                }

                {relatedInvoicesPaidTransfer != '' &&
                <table className="table harmonica-table">
                    <tbody>
                    {relatedInvoicesPaidTransfer.map((relatedInvoice, i) => {
                        return (
                            <tr onClick={() => this.openItem(relatedInvoice.id)} key={i}>
                                <td className='col-xs-12 clickable'>{moment(relatedInvoice.createdAt.date).format('L')} - {relatedInvoice.number}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                }
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        relatedInvoicesPaidTransfer: state.orderDetails.relatedInvoicesPaidTransfer,
    };
};

export default connect(mapStateToProps)(InvoicesPaidTransferPaidTransferList);

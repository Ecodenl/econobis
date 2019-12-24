import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class InvoicesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedInvoices: '',
        };
    }

    openItem = id => {
        hashHistory.push(`/nota/${id}`);
    };

    render() {
        const { relatedInvoices } = this.props;
        return (
            <div>
                {relatedInvoices == '' && <div>Geen nota's gevonden.</div>}

                {relatedInvoices != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedInvoices.map((relatedInvoice, i) => {
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
        relatedInvoices: state.orderDetails.relatedInvoices,
    };
};

export default connect(mapStateToProps)(InvoicesList);

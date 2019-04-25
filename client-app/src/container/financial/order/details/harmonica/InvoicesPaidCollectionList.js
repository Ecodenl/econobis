import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

class InvoicesPaidCollectionPaidCollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relatedInvoicesPaidCollection: '',
        };
    }

    openItem = id => {
        hashHistory.push(`/factuur/${id}`);
    };

    render() {
        const { relatedInvoicesPaidCollection } = this.props;
        return (
            <div>
                {relatedInvoicesPaidCollection == '' && <div>Geen geïncasseerde incasso's gevonden.</div>}

                {relatedInvoicesPaidCollection != '' && (
                    <table className="table harmonica-table">
                        <tbody>
                            {relatedInvoicesPaidCollection.map((relatedInvoice, i) => {
                                return (
                                    <tr onClick={() => this.openItem(relatedInvoice.id)} key={i}>
                                        <td className="col-xs-12 clickable">
                                            {moment(relatedInvoice.createdAt.date).format('L')} -{' '}
                                            {relatedInvoice.number}
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
        relatedInvoicesPaidCollection: state.orderDetails.relatedInvoicesPaidCollection,
    };
};

export default connect(mapStateToProps)(InvoicesPaidCollectionPaidCollectionList);

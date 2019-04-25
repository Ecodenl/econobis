import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const InvoicesList = ({ relatedInvoices }) => {
    const openItem = id => {
        hashHistory.push(`/factuur/${id}`);
    };

    return (
        <div>
            {relatedInvoices == '' && <div>Geen facturen gevonden.</div>}

            {relatedInvoices != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedInvoices.map((relatedInvoice, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-xs-10 clickable" onClick={() => openItem(relatedInvoice.id)}>
                                        {' '}
                                        {relatedInvoice.number} - {relatedInvoice.order.subject} -{' '}
                                        {relatedInvoice.status.name} - {moment(relatedInvoice.created_at).format('L')}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        relatedInvoices: state.contactDetails.relatedInvoices,
    };
};

export default connect(mapStateToProps)(InvoicesList);

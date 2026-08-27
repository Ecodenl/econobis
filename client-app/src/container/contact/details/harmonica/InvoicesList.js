import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const InvoicesList = ({ relatedInvoices }) => {
    const navigate = useNavigate();

    const openItem = id => {
        navigate(`/nota/${id}`);
    };

    return (
        <div>
            {relatedInvoices == '' && <div>Geen nota's gevonden.</div>}

            {relatedInvoices != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedInvoices.map((relatedInvoice, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-xs-10 clickable" onClick={() => openItem(relatedInvoice.id)}>
                                        {' '}
                                        {relatedInvoice.number} - {relatedInvoice.subject} -{' '}
                                        {relatedInvoice.status.name} - {moment(relatedInvoice.createdAt).format('L')}
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

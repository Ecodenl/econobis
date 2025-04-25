import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const OpportunitiesList = ({ relatedOrders }) => {
    const navigate = useNavigate();

    const openItem = id => {
        navigate(`/order/${id}`);
    };

    return (
        <div>
            {relatedOrders == '' && <div>Geen orders gevonden.</div>}

            {relatedOrders != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedOrders.map((relatedOrder, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-xs-10 clickable" onClick={() => openItem(relatedOrder.id)}>
                                        {relatedOrder.number} - {relatedOrder.subject}{' '}
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
        relatedOrders: state.contactDetails.relatedOrders,
    };
};

export default connect(mapStateToProps)(OpportunitiesList);

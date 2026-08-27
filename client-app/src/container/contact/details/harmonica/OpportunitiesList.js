import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const OpportunitiesList = ({ relatedOpportunities }) => {
    const navigate = useNavigate();

    const openItem = id => {
        navigate(`/kans/${id}`);
    };

    return (
        <div>
            {relatedOpportunities && relatedOpportunities == '' && <div>Geen kansen gevonden.</div>}

            {relatedOpportunities && relatedOpportunities != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedOpportunities.map((relatedOpportunity, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-xs-10 clickable" onClick={() => openItem(relatedOpportunity.id)}>
                                        {moment(relatedOpportunity.created_at).format('L')} -{' '}
                                        {relatedOpportunity.measure_category.name} -{' '}
                                        {relatedOpportunity.measuresDashSeperated}
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
        relatedOpportunities: state.contactDetails.relatedOpportunities,
    };
};

export default connect(mapStateToProps)(OpportunitiesList);

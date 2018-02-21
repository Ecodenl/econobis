import React from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const OpportunitiesList = ({relatedOpportunities}) => {
    const openItem = (id) => {
        hashHistory.push(`/kans/${id}`);
    };

    return (
        <div>
            {relatedOpportunities == '' &&
            <div>Geen kansen gevonden</div>
            }

            {relatedOpportunities != '' &&
            <table className="table harmonica-table">
                <tbody>
                {relatedOpportunities.map((relatedOpportunity, i) => {
                    return (
                        <tr key={i}>
                            <td className='col-xs-10 clickable'
                                onClick={() => openItem(relatedOpportunity.id)}>{moment(relatedOpportunity.created_at).format('L')} - {relatedOpportunity.number} </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        relatedOpportunities: state.contactDetails.relatedOpportunities,
    };
};

export default connect(mapStateToProps)(OpportunitiesList);

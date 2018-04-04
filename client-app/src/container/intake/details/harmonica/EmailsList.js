import React from 'react';
import {hashHistory} from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const EmailsList = ({relatedEmailsSent}) => {
    const openItem = (id) => {
        hashHistory.push(`/email/${id}`);
    };

    return (
        <div>
            {relatedEmailsSent == '' &&
            <div>Geen e-mails gevonden.</div>
            }

            {relatedEmailsSent != '' &&
            <table className="table harmonica-table">
                <tbody>
                {relatedEmailsSent.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td className='col-xs-12 clickable' onClick={() => openItem(item.id)}>
                                {moment(item.date_sent).format('L')} - {item.subject}
                            </td>
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
        relatedEmailsSent: state.intakeDetails.relatedEmailsSent,
    };
};

export default connect(mapStateToProps)(EmailsList);

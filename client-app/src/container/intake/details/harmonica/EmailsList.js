import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import EmailDetailsModal from "../../../email/details-modal/EmailDetailsModal";

const EmailsList = ({ relatedEmailsSent }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [activeEmailId, setActiveEmailId] = useState(null);

    const openItem = id => {
        setShowDetailsModal(true);
        setActiveEmailId(id);
    };

    return (
        <div>
            {relatedEmailsSent == '' && <div>Geen e-mails gevonden.</div>}

            {relatedEmailsSent != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedEmailsSent.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-xs-12 clickable" onClick={() => openItem(item.id)}>
                                        {moment(item.date_sent).format('L')} - {item.subject}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <EmailDetailsModal showModal={showDetailsModal} emailId={activeEmailId} setShowModal={(show) => setShowDetailsModal(show)}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        relatedEmailsSent: state.intakeDetails.relatedEmailsSent,
    };
};

export default connect(mapStateToProps)(EmailsList);

import React, {useContext} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {EmailModalContext} from "../../../../context/EmailModalContext";

const EmailsSentList = ({ emails }) => {
    const { openEmailDetailsModal } = useContext(EmailModalContext);

    return (
        <div>
            {emails === '' && <div>Geen e-mails gevonden.</div>}

            {emails !== '' && (
                <table className="table harmonica-table">
                    <tbody>
                    {emails.map((item, i) => (
                        <tr key={i}>
                            <td className="col-xs-4 clickable" onClick={() => openEmailDetailsModal(item.id)}>
                                {moment(item.date_sent).format('L')}
                            </td>
                            <td className="col-xs-8 clickable" onClick={() => openEmailDetailsModal(item.id)}>
                                {item.subject}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        emails: state.taskDetails.relatedEmailsInbox,
    };
};

export default connect(mapStateToProps)(EmailsSentList);
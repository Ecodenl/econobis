import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const NotesList = ({ relatedNotes }) => {
    const navigate = useNavigate();

    function openItem(id) {
        navigate(`/taak/${id}`);
    }

    return (
        <div>
            {relatedNotes == '' && <div>Geen notities gevonden.</div>}

            {relatedNotes != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedNotes.map((relatedNotes, i) => {
                            return (
                                <tr onClick={() => openItem(relatedNotes.id)} key={i}>
                                    <td className="col-xs-12 clickable">
                                        {moment(relatedNotes.createdAt).format('L')} - {relatedNotes.noteSummary}
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
        relatedNotes: state.intakeDetails.relatedNotes,
    };
};

export default connect(mapStateToProps)(NotesList);

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const NotesList = ({ relatedNotes }) => {
    const navigate = useNavigate();

    const openItem = id => {
        navigate(`/taak/${id}`);
    };

    return (
        <div>
            {relatedNotes == '' && <div>Geen notities gevonden.</div>}

            {relatedNotes != '' && (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedNotes.map((relatedNote, i) => {
                            return (
                                <tr onClick={() => openItem(relatedNote.id)} key={i}>
                                    <td className="col-xs-12 clickable">
                                        {moment(relatedNote.createdAt).format('L')} - {relatedNote.noteSummary}
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
        relatedNotes: state.opportunityDetails.relatedNotes,
    };
};

export default connect(mapStateToProps)(NotesList);

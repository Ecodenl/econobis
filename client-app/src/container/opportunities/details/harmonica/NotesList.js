import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const NotesList = ({ relatedNotes }) => {
    const openItem = id => {
        hashHistory.push(`/taak/${id}`);
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
                                        {moment(relatedNote.createdAt.date).format('L')} - {relatedNote.noteSummary}
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

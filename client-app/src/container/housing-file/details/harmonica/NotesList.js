import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

const NotesList = ({ relatedNotes }) => {
    function openItem(id) {
        hashHistory.push(`/taak/${id}`);
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
                                        {moment(relatedNotes.createdAt.date).format('L')} - {relatedNotes.noteSummary}
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
        relatedNotes: state.housingFileDetails.relatedNotes,
    };
};

export default connect(mapStateToProps)(NotesList);

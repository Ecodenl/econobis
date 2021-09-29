import React from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

function NoteList({ relatedNotes }) {
    function openItem(id) {
        hashHistory.push(`/taak/${id}`);
    }

    if (relatedNotes.length === 0) return <div>Geen notities gevonden.</div>;

    return (
        <div>
            <table className="table harmonica-table">
                <tbody>
                    {relatedNotes.map(relatedNote => (
                        <tr onClick={() => openItem(relatedNote.id)} key={relatedNote.id}>
                            <td className="col-xs-12 clickable">
                                {moment(relatedNote.createdAt).format('L')} - {relatedNote.noteSummary}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NoteList;

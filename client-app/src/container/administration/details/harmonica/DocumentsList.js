import React from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

function DocumentsList({ relatedDocuments }) {
    function openItem(id) {
        hashHistory.push(`/document/${id}/administration`);
    }

    if (relatedDocuments.length === 0) return <div>Geen documenten gevonden.</div>;

    return (
        <div>
            <table className="table harmonica-table">
                <tbody>
                    {relatedDocuments.map(item => (
                        <tr onClick={() => openItem(item.id)} key={item.id}>
                            <td className="col-xs-5 clickable">{moment(item.createdAt).format('L')}</td>
                            <td className="col-xs-6 clickable">{item.filename}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DocumentsList;

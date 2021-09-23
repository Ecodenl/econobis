import React from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

function TaskList({ relatedTasks }) {
    function openItem(id) {
        hashHistory.push(`/taak/${id}`);
    }

    if (relatedTasks.length === 0) return <div>Geen taken gevonden.</div>;

    return (
        <div>
            <table className="table harmonica-table">
                <tbody>
                    {relatedTasks.map(item => (
                        <tr onClick={() => openItem(item.id)} key={item.id}>
                            <td className="col-xs-12 clickable">
                                {moment(item.createdAt).format('L')} - {item.noteSummary}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;

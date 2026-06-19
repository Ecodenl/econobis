import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function TaskList({ relatedTasks }) {
    const navigate = useNavigate();

    function openItem(id) {
        navigate(`/taak/${id}`);
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

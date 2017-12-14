import React from 'react';
import { hashHistory } from 'react-router';

const TaskList = () => {
    const openItem = (id) => {
        hashHistory.push(`/taak/${id}`);
    };

    return (
        <div className="col-sm-12 extra-space-above">
            <table className="table">
                <tbody>
                    <tr onClick={() => openItem(1)}>
                        <td>01-02-2018</td>
                        <td>Emailen</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
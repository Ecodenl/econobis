import React from 'react';
import { hashHistory } from 'react-router';

const RegistrationList = () => {
    const openItem = (id) => {
        hashHistory.push(`/aanmelding/${id}`);
    };

    return (
        <div className="col-sm-12 extra-space-above">
            <table className="table">
                <tbody>
                    <tr onClick={() => openItem(1)}>
                        <td>01-01-2018</td>
                        <td>Klaas</td>
                    </tr>
                    <tr onClick={() => openItem(2)}>
                        <td>01-03-2018</td>
                        <td>Pietje</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RegistrationList;
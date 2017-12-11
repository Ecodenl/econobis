import React from 'react';
import { hashHistory } from 'react-router';

const OpportunityList = () => {
    const openItem = (id) => {
        hashHistory.push(`/kans/${id}`);
    };

    return (
        <div className="col-sm-12 extra-space-above">
            <table className="table">
                <tbody>
                    <tr onClick={() => openItem(1)}>
                        <td>12-12-2017</td>
                        <td>Nieuw</td>
                    </tr>
                    <tr onClick={() => openItem(2)}>
                        <td>01-02-2018</td>
                        <td>Uitbreiding</td>
                    </tr>
                    <tr onClick={() => openItem(1)}>
                        <td>14-03-2018</td>
                        <td>Via organisatie</td>
                    </tr>
                    <tr onClick={() => openItem(2)}>
                        <td>01-04-2018</td>
                        <td>Nog een kans </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OpportunityList;
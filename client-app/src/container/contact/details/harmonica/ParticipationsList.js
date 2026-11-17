import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';

const ParticipationsList = ({ relatedParticipations = [] }) => {
    const navigate = useNavigate();

    return (
        <div>
            {relatedParticipations.length === 0 ? (
                <div>Geen deelnames gevonden.</div>
            ) : (
                <table className="table harmonica-table">
                    <tbody>
                        {relatedParticipations.map(item => (
                            <tr onClick={() => navigate(`/project/deelnemer/${item.id}`)} key={item.id}>
                                <td className="col-xs-5 clickable">{moment(item.createdAt).format('L')}</td>
                                <td className="col-xs-6 clickable">
                                    {item.projectTypeCodeRef === 'loan'
                                        ? `${MoneyPresenter(item.amountDefinitive)} in ${item.projectName} `
                                        : `${item.participationsDefinitive} in ${item.projectName} `}
                                    {item.participationPostalCodeNumberAddition
                                        ? ` (${item.participationPostalCodeNumberAddition})`
                                        : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ParticipationsList;

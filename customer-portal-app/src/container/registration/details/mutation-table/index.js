import React from 'react';
import Table from 'react-bootstrap/Table';
import valueBasedOnTypePresenter from '../../../../helpers/ValueBasedOnTypePresenter';

function RegistrationDetailsMutationTable({ participantMutations }) {
    if (!participantMutations || participantMutations.length === 0) return <p>Geen mutaties bekend</p>;

    return (
        <Table responsive={true} className={'my-4'}>
            <thead>
                <tr>
                    {participantMutations[0].fields.map((field, index) => (
                        <th key={index}>{field.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {participantMutations.map((participantMutation, index) => (
                    <tr key={index}>
                        {participantMutation.fields.map((field, index) => (
                            <td key={index}>{valueBasedOnTypePresenter(field)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RegistrationDetailsMutationTable;

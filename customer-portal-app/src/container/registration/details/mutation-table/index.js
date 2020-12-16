import React from 'react';
import Table from 'react-bootstrap/Table';
import valueBasedOnTypePresenter from '../../../../helpers/ValueBasedOnTypePresenter';

function MutationTable({ participantMutations }) {
    if (participantMutations.length === 0) return 'Geen mutaties bekend';

    return (
        <Table responsive={true} className={'my-4'}>
            <thead>
                <tr>
                    {participantMutations[0].fields.map(field => (
                        <th>{field.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {participantMutations.map(participantMutation => (
                    <tr>
                        {participantMutation.fields.map(field => (
                            <td>{valueBasedOnTypePresenter(field)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default MutationTable;

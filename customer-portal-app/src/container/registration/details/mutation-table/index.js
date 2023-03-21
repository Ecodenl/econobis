import React from 'react';
import Table from 'react-bootstrap/Table';
import valueBasedOnTypePresenter from '../../../../helpers/ValueBasedOnTypePresenter';
import classNameBasedOnTypePresenter from '../../../../helpers/classNameBasedOnTypePresenter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegistrationDetailsMutationTable({ participantMutations }) {
    if (!participantMutations || participantMutations.length === 0) return <p>Geen mutaties bekend</p>;

    return (
        <>
            <Row>
                <Col>
                    <div className="content-subheading">Mutaties</div>
                </Col>
            </Row>
            <Table responsive={true}>
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
                                <td className='text-left' key={index}>
                                    {valueBasedOnTypePresenter(field)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default RegistrationDetailsMutationTable;

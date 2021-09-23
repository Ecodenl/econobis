import React from 'react';
import Table from 'react-bootstrap/Table';
import classNameBasedOnTypePresenter from '../../../../helpers/classNameBasedOnTypePresenter';
import valueBasedOnTypePresenter from '../../../../helpers/ValueBasedOnTypePresenter';

function RegistrationDetailsProjectTable({ fields }) {
    if (!fields || fields.length === 0) return <p>Geen projectdetails bekend</p>;

    return (
        <Table className={'my-4'}>
            <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td>
                            <strong>{field.label}</strong>
                        </td>
                        <td>{valueBasedOnTypePresenter(field)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RegistrationDetailsProjectTable;

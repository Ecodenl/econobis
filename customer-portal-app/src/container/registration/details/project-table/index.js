import React from 'react';
import Table from 'react-bootstrap/Table';

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
                        <td>{field.value}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RegistrationDetailsProjectTable;
